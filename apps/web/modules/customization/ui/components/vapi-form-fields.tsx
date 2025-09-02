import { UseFormReturn } from "react-hook-form";
import { FormSchema } from "./customization-form";
import {
  useVapiAssistants,
  useVapiPhoneNumbers,
} from "@/modules/plugins/plugins/use-vapi-data";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@workspace/ui/components/form";
import { Textarea } from "@workspace/ui/components/textarea";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem
} from "@workspace/ui/components/select";

interface VapiFormFieldsProps {
  form: UseFormReturn<FormSchema>;
}

export const VapiFormFields = ({ form  }: VapiFormFieldsProps) => {
  const { data: assistants, isLoading: assistanceLoading } =
    useVapiAssistants();
  const { data: phoneNumber, isLoading : phoneLoading } = useVapiPhoneNumbers();
 const disabled = form.formState.isSubmitted
  return (
    <>
      <FormField
        control={form.control}
        name="vapiSettings.assistantId"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Greeting Message</FormLabel>
            <Select
              value={field.value}
              disabled={disabled || assistanceLoading}
              onValueChange={field.onChange}
            >
              <FormControl>
                <SelectTrigger>
                  <SelectValue
                    placeholder={
                      assistanceLoading
                        ? "Loading Assistants..."
                        : "Select an Assistant"
                    }
                  />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="none">None</SelectItem>
                {assistants.map((assistant) => (
                    <SelectItem
                        key={assistant.id} value={assistant.id}
                    >
                        {assistant.name || "Unnamed Assistant"} -{" "}
                        {assistant.model?.model || "Unkown Model"}
                    </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormDescription>
                The Vapi Assistant to use for voice calls!
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="vapiSettings.phoneNumber"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Phone Number</FormLabel>
            <Select
              value={field.value}
              disabled={disabled || phoneLoading}
              onValueChange={field.onChange}
            >
              <FormControl>
                <SelectTrigger>
                  <SelectValue
                    placeholder={
                      assistanceLoading
                        ? "Loading Phone Numbers..."
                        : "Select a Phone Number"
                    }
                  />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="none">None</SelectItem>
                {phoneNumber.map((phone) => (
                    <SelectItem
                        key={phone.id} value={ phone.number || phone.id}
                    >
                        {phone.number || "Unknown"} -{" "}
                        {phone.name || "Unnamed"}
                    </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormDescription>
               Phone number to be displyed in widget
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
};

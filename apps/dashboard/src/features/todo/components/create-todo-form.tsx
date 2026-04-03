import { Button } from "@realm/ui/components/button";
import { Field, FieldError, FieldGroup } from "@realm/ui/components/field";
import { Input } from "@realm/ui/components/input";
import { LoaderCircleIcon, PlusIcon } from "lucide-react";
import { useCreateTodoForm } from "../hooks/use-create-todo-form";

export function CreateTodoForm() {
  const { form } = useCreateTodoForm();

  return (
    <form
      className="flex flex-row gap-2"
      id="create-todo-form"
      onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit(e);
      }}
    >
      <FieldGroup>
        <form.Field name="title">
          {(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid;

            return (
              <Field data-invalid={isInvalid}>
                <Input
                  aria-invalid={isInvalid}
                  autoComplete="off"
                  id={field.name}
                  name={field.name}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  placeholder="New todo"
                  value={field.state.value}
                />
                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            );
          }}
        </form.Field>
      </FieldGroup>
      <form.Subscribe>
        {({ isSubmitting }) => (
          <Button
            disabled={isSubmitting}
            size="icon"
            type="submit"
            variant="outline"
          >
            {isSubmitting ? (
              <LoaderCircleIcon className="animate-spin" />
            ) : (
              <PlusIcon />
            )}
          </Button>
        )}
      </form.Subscribe>
    </form>
  );
}

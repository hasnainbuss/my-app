import { CustomFormInputProps } from "../../../../components/models/CustomFormInputProps";
import { ValidationType } from "../../../../components/models/Enumerations";
import * as yup from "yup";

export const getInputs = (
  form: CustomFormInputProps[],
  initialValues: { [key: string]: any } = {}
) => {
  const formWithInitialValues = form.map((input) => ({
    ...input,
    initialValue: initialValues[input.name] || "",
  }));

  const validationSchema = generateValidationSchema(form);

  return {
    validationSchema: validationSchema,
    initialValues,
    inputs: formWithInitialValues,
  };
};

const generateValidationSchema = (inputs: CustomFormInputProps[]) => {
  let validationSchema = yup.object();

  inputs.forEach((input) => {
    if (input.validations) {
      let fieldSchema = yup.string().nullable(); // Allow `null` and `undefined` as valid values

      input.validations.forEach((rule : any) => {
        switch (rule.type) {
          case ValidationType.isEmail:
            fieldSchema = fieldSchema.email(rule.message);
            break;

          case ValidationType.minLength:
            fieldSchema = fieldSchema.min(rule.value as number, rule.message);
            break;

          case ValidationType.maxLength:
            fieldSchema = fieldSchema.max(rule.value as number, rule.message);
            break;

          case ValidationType.passwordMatch:
            const confirmPasswordField = inputs.find(
              (item) => item.name === "confirmPassword"
            );
            if (confirmPasswordField) {
              fieldSchema = fieldSchema.oneOf(
                [yup.ref(confirmPasswordField.name)],
                rule.message
              );
            }
            break;

          // Add more validation rule cases as needed

          default:
            break;
        }
      });

      if (!input.required) {
        fieldSchema = fieldSchema.nullable(); // Set the field as not required
      } else {
        validationSchema = validationSchema.shape({
          [input.name]: fieldSchema.required(
            input.validations.find(
              (rule : any) => rule.type === ValidationType.required
            )?.message
          ),
        });
      }
    }
  });

  return validationSchema;
};

// const generateValidationSchema = (inputs: CustomFormInputProps[]) => {
//   let validationSchema = yup.object();

//   inputs.forEach((input) => {
//     if (input.validations) {
//       let fieldSchema = yup.string().nullable();

//       input.validations.forEach((rule) => {
//         switch (rule.type) {
//           case ValidationType.isEmail:
//             fieldSchema = fieldSchema.email(rule.message);
//             break;

//           case ValidationType.minLength:
//             fieldSchema = fieldSchema.min(rule.value as number, rule.message);
//             break;

//           case ValidationType.maxLength:
//             fieldSchema = fieldSchema.max(rule.value as number, rule.message);
//             break;

//           case ValidationType.passwordMatch:
//             const confirmPasswordField = inputs.find(
//               (item) => item.name === "confirmPassword"
//             );
//             if (confirmPasswordField) {
//               fieldSchema = fieldSchema.oneOf(
//                 [yup.ref(confirmPasswordField.name)],
//                 rule.message
//               );
//             }
//             break;

//           // Add more validation rule cases as needed

//           default:
//             break;
//         }
//       });

//       if (!input.required) {
//         fieldSchema = fieldSchema.notRequired(); // Set the field as not required
//       }

//       validationSchema = validationSchema.shape({
//         [input.name]: fieldSchema,
//       });

//       // validationSchema = validationSchema.shape({
//       //   [input.name]: fieldSchema.concat(
//       //     input.validations
//       //       .filter((rule) => {
//       //         if (rule.type === ValidationType.required && !input.required) {
//       //           return false; // Skip the "required" validation if input.required is false
//       //         }
//       //         return true;
//       //       })
//       //       .reduce((schema, rule) => {
//       //         return schema.concat(fieldSchema);
//       //       }, fieldSchema)
//       //   ),
//       // });
//       validationSchema = validationSchema.shape({
//         [input.name]: fieldSchema.required(
//           input.validations.find(
//             (rule) => rule.type === ValidationType.required
//           )?.message
//         ),
//       });
//     }
//   });

//   return validationSchema;
// };

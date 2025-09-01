import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { AlertCircle, CheckCircle2, Eye, EyeOff } from "lucide-react";
import { useState } from "react";

function CommonForm({
  formControls,
  formData,
  setFormData,
  onSubmit,
  buttonText,
  isBtnDisabled,
  hiddenFields = [],
  errors = {},
  isSubmitting = false,
  showValidationIcons = false,
}) {
  const [passwordVisible, setPasswordVisible] = useState({});

  const togglePasswordVisibility = (fieldName) => {
    setPasswordVisible(prev => ({
      ...prev,
      [fieldName]: !prev[fieldName]
    }));
  };

  function renderInputsByComponentType(getControlItem) {
    let element = null;
    const value = formData[getControlItem.name] || "";
    const error = errors[getControlItem.name];
    const hasError = !!error;
    const isValid = showValidationIcons && value && !error;

    switch (getControlItem.componentType) {
      case "input":
        const isPassword = getControlItem.type === "password";
        element = (
          <div className="relative">
            <Input
              name={getControlItem.name}
              placeholder={getControlItem.placeholder}
              id={getControlItem.name}
              type={isPassword && passwordVisible[getControlItem.name] ? "text" : getControlItem.type}
              value={value}
              onChange={(event) =>
                setFormData(getControlItem.name, event.target.value)
              }
              className={hasError ? "border-destructive focus-visible:ring-destructive" : 
                         isValid ? "border-green-500 focus-visible:ring-green-500" : ""}
              disabled={isSubmitting}
            />
            {isPassword && (
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                onClick={() => togglePasswordVisibility(getControlItem.name)}
              >
                {passwordVisible[getControlItem.name] ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            )}
            {isValid && (
              <CheckCircle2 className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-green-500" />
            )}
          </div>
        );
        break;

      case "select":
        element = (
          <Select
            onValueChange={(value) =>
              setFormData(getControlItem.name, value)
            }
            value={value}
            disabled={isSubmitting}
          >
            <SelectTrigger className={`w-full ${hasError ? "border-destructive focus:ring-destructive" : ""}`}>
              <SelectValue placeholder={getControlItem.placeholder || getControlItem.label} />
            </SelectTrigger>
            <SelectContent>
              {getControlItem.options && getControlItem.options.length > 0
                ? getControlItem.options.map((optionItem) => (
                    <SelectItem key={optionItem.id} value={optionItem.id}>
                      {optionItem.label}
                    </SelectItem>
                  ))
                : null}
            </SelectContent>
          </Select>
        );
        break;

      case "textarea":
        element = (
          <Textarea
            name={getControlItem.name}
            placeholder={getControlItem.placeholder}
            id={getControlItem.id}
            value={value}
            onChange={(event) =>
              setFormData(getControlItem.name, event.target.value)
            }
            className={hasError ? "border-destructive focus-visible:ring-destructive" : ""}
            disabled={isSubmitting}
            rows={getControlItem.rows || 3}
          />
        );
        break;

      case "radio":
        element = (
          <div className="flex gap-4 flex-wrap">
            {getControlItem.options?.map((option) => (
              <label key={option.id} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name={getControlItem.name}
                  value={option.id}
                  checked={formData[getControlItem.name] === option.id}
                  onChange={() =>
                    setFormData(getControlItem.name, option.id)
                  }
                  disabled={isSubmitting}
                  className="text-primary focus:ring-primary"
                />
                <span className="text-sm">{option.label}</span>
              </label>
            ))}
          </div>
        );
        break;

      case "checkbox":
        element = (
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              name={getControlItem.name}
              checked={!!formData[getControlItem.name]}
              onChange={(event) =>
                setFormData(getControlItem.name, event.target.checked)
              }
              disabled={isSubmitting}
              className="text-primary focus:ring-primary"
            />
            <span className="text-sm">{getControlItem.label}</span>
          </label>
        );
        break;

      default:
        element = (
          <Input
            name={getControlItem.name}
            placeholder={getControlItem.placeholder}
            id={getControlItem.name}
            type={getControlItem.type}
            value={value}
            onChange={(event) =>
              setFormData(getControlItem.name, event.target.value)
            }
            className={hasError ? "border-destructive focus-visible:ring-destructive" : ""}
            disabled={isSubmitting}
          />
        );
        break;
    }

    return (
      <div>
        {element}
        {hasError && (
          <div className="flex items-center gap-1 mt-1 text-destructive text-xs">
            <AlertCircle className="h-3 w-3" />
            <span>{error}</span>
          </div>
        )}
        {getControlItem.description && !hasError && (
          <p className="text-xs text-muted-foreground mt-1">
            {getControlItem.description}
          </p>
        )}
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="flex flex-col gap-4">
        {formControls
          .filter((controlItem) => !hiddenFields.includes(controlItem.name))
          .map((controlItem) => (
            <div className="grid w-full gap-1.5" key={controlItem.name}>
              {controlItem.componentType !== "checkbox" && (
                <Label htmlFor={controlItem.name} className="mb-1">
                  {controlItem.label}
                  {controlItem.required && <span className="text-destructive ml-1">*</span>}
                </Label>
              )}
              {renderInputsByComponentType(controlItem)}
            </div>
          ))}
      </div>
      <Button 
        disabled={isBtnDisabled || isSubmitting} 
        type="submit" 
        className="w-full mt-2"
      >
        {isSubmitting ? (
          <>
            <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-background border-t-transparent" />
            {buttonText || "Submitting..."}
          </>
        ) : (
          buttonText || "Submit"
        )}
      </Button>
    </form>
  );
}

export default CommonForm;
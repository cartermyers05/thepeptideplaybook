import { useState, useEffect } from "react";
import { ChevronDown, Check, Gift, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { supabase } from "@/integrations/supabase/client";
import { cn } from "@/lib/utils";

interface PromoCodeInputProps {
  initialCode?: string;
  onValidCode: (code: string, type: string) => void;
  onInvalidCode: () => void;
  disabled?: boolean;
}

export function PromoCodeInput({ 
  initialCode = "", 
  onValidCode, 
  onInvalidCode,
  disabled = false 
}: PromoCodeInputProps) {
  const [isOpen, setIsOpen] = useState(!!initialCode);
  const [code, setCode] = useState(initialCode);
  const [isValidating, setIsValidating] = useState(false);
  const [validationResult, setValidationResult] = useState<{
    valid: boolean;
    message?: string;
    type?: string;
  } | null>(null);

  useEffect(() => {
    if (initialCode) {
      setCode(initialCode);
      validateCode(initialCode);
    }
  }, [initialCode]);

  const validateCode = async (codeToValidate: string) => {
    if (!codeToValidate.trim()) {
      setValidationResult(null);
      onInvalidCode();
      return;
    }

    setIsValidating(true);
    try {
      const { data, error } = await supabase.functions.invoke("validate-promo-code", {
        body: { code: codeToValidate.trim() },
      });

      if (error) {
        setValidationResult({ valid: false, message: "Failed to validate code" });
        onInvalidCode();
        return;
      }

      setValidationResult({
        valid: data.valid,
        message: data.valid ? data.message : data.error,
        type: data.type,
      });

      if (data.valid) {
        onValidCode(codeToValidate.trim().toUpperCase(), data.type);
      } else {
        onInvalidCode();
      }
    } catch {
      setValidationResult({ valid: false, message: "Failed to validate code" });
      onInvalidCode();
    } finally {
      setIsValidating(false);
    }
  };

  const handleApply = () => {
    validateCode(code);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleApply();
    }
  };

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen} className="w-full">
      <CollapsibleTrigger asChild>
        <button
          type="button"
          disabled={disabled}
          className={cn(
            "flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors",
            disabled && "opacity-50 cursor-not-allowed"
          )}
        >
          <Gift className="w-4 h-4" />
          Have a promo code?
          <ChevronDown className={cn("w-4 h-4 transition-transform", isOpen && "rotate-180")} />
        </button>
      </CollapsibleTrigger>
      <CollapsibleContent className="mt-3">
        <div className="flex gap-2">
          <Input
            type="text"
            placeholder="Enter code..."
            value={code}
            onChange={(e) => {
              setCode(e.target.value.toUpperCase());
              setValidationResult(null);
            }}
            onKeyDown={handleKeyDown}
            disabled={disabled || isValidating}
            className="h-10 uppercase"
            maxLength={20}
          />
          <Button
            type="button"
            variant="secondary"
            onClick={handleApply}
            disabled={disabled || isValidating || !code.trim()}
            className="h-10 px-4"
          >
            {isValidating ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              "Apply"
            )}
          </Button>
        </div>
        {validationResult && (
          <div
            className={cn(
              "mt-2 flex items-center gap-2 text-sm",
              validationResult.valid ? "text-success" : "text-destructive"
            )}
          >
            {validationResult.valid && <Check className="w-4 h-4" />}
            {validationResult.message}
          </div>
        )}
      </CollapsibleContent>
    </Collapsible>
  );
}

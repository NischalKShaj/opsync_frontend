import { InputHTMLAttributes, forwardRef } from "react";
import { Mail, Lock, User, Eye, EyeOff } from "lucide-react";
import { useState } from "react";

interface PremiumInputProps extends InputHTMLAttributes<HTMLInputElement> {
  icon?: "email" | "password" | "name" | "none";
  label?: string;
}

export const PremiumInput = forwardRef<HTMLInputElement, PremiumInputProps>(
  ({ icon = "none", label, type = "text", className = "", ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);
    const [isFocused, setIsFocused] = useState(false);

    const getIcon = () => {
      switch (icon) {
        case "email":
          return <Mail className="w-5 h-5 text-gray-400" />;
        case "password":
          return <Lock className="w-5 h-5 text-gray-400" />;
        case "name":
          return <User className="w-5 h-5 text-gray-400" />;
        default:
          return null;
      }
    };

    const inputType = type === "password" && showPassword ? "text" : type;

    return (
      <div className="space-y-2">
        {label && (
          <label className="text-sm font-medium text-gray-300 block">
            {label}
          </label>
        )}
        <div
          className={`relative group transition-all duration-200 ${
            isFocused ? "scale-[1.01]" : ""
          }`}
        >
          <div className="relative flex items-center">
            {icon !== "none" && (
              <div className="absolute left-4 z-10 pointer-events-none">
                {getIcon()}
              </div>
            )}
            <input
              ref={ref}
              type={inputType}
              className={`
                w-full h-[48px] px-4 ${icon !== "none" ? "pl-12" : "pl-4"} ${
                  type === "password" ? "pr-12" : "pr-4"
                }
                bg-[#0F1117]/50 backdrop-blur-sm
                border border-white/5
                rounded-xl
                text-white
                placeholder:text-gray-500
                transition-all duration-200
                focus:outline-none
                focus:border-[#22D3EE]/30
                focus:bg-[#0F1117]/70
                hover:border-white/10
                ${className}
              `}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              {...props}
            />
            {type === "password" && (
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 z-10 text-gray-400 hover:text-gray-300 transition-colors"
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    );
  },
);

PremiumInput.displayName = "PremiumInput";

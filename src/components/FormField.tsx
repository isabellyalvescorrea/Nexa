import { Eye, EyeOff, type LucideIcon } from 'lucide-react'
import { useState, type ChangeEventHandler, type HTMLInputTypeAttribute } from 'react'
import { cn } from '@/utils/cn'

type FormFieldProps = {
  label?: string
  placeholder: string
  icon: LucideIcon
  type?: HTMLInputTypeAttribute
  options?: string[]
  name?: string
  value?: string
  onChange?: ChangeEventHandler<HTMLInputElement | HTMLSelectElement>
  autoComplete?: string
  required?: boolean
  disabled?: boolean
}

export function FormField({
  label,
  placeholder,
  icon: Icon,
  type = 'text',
  options,
  name,
  value,
  onChange,
  autoComplete,
  required,
  disabled,
}: FormFieldProps) {
  const [visible, setVisible] = useState(false)
  const isPassword = type === 'password'
  const inputType = isPassword && visible ? 'text' : type

  return (
    <label className="auth-field group block text-left">
      {label && <span className="mb-2 block text-sm font-semibold text-white">{label}</span>}
      <span className="relative block">
        <Icon className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-white/55 transition group-focus-within:text-nexa-pink" />
        {options ? (
          <select
            name={name}
            value={value ?? ''}
            onChange={onChange}
            autoComplete={autoComplete}
            required={required}
            disabled={disabled}
            className="auth-field-control h-14 w-full appearance-none rounded-lg border border-white/10 bg-nexa-deep/70 px-12 text-sm text-white/80 outline-none transition placeholder:text-white/38 focus:border-nexa-violet/70 focus:shadow-[0_0_24px_rgba(174,60,255,0.24)]"
          >
            <option value="" disabled>
              {placeholder}
            </option>
            {options.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        ) : (
          <input
            name={name}
            type={inputType}
            value={value ?? ''}
            onChange={onChange}
            autoComplete={autoComplete}
            required={required}
            disabled={disabled}
            placeholder={placeholder}
            className={cn(
              'auth-field-control h-14 w-full rounded-lg border border-white/10 bg-nexa-deep/70 px-12 text-sm text-white outline-none transition placeholder:text-white/38',
              'focus:border-nexa-violet/70 focus:shadow-[0_0_24px_rgba(174,60,255,0.24)]',
            )}
          />
        )}
        {isPassword && (
          <button
            type="button"
            aria-label={visible ? 'Ocultar senha' : 'Mostrar senha'}
            onClick={() => setVisible((current) => !current)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white/55 transition hover:text-nexa-cyan"
          >
            {visible ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
          </button>
        )}
      </span>
    </label>
  )
}

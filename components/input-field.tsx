import { cn } from '@/lib/utils';
import React, { DetailedHTMLProps, InputHTMLAttributes } from 'react';

type InputFieldProps = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> & {
  className?: string;
  error: string | undefined;
};

export default function InputField({
  error,
  className,
  disabled,
  ...props
}: InputFieldProps) {
  if (props.type === 'checkbox') return;

  const renderField = () => {
    const { type } = props;

    if (type === 'checkbox') {
      <Checkbox {...props} error={error} />;
    }

    return (
      <input
        {...props}
        className={cn([
          'w-full px-4 py-2 rounded-[10px] focus:outline-none py-3 focus:ring bg-input mb-1',
          className,
          disabled ? 'bg-slate-400 text-muted' : '',
          !!error ? 'border-error border-2' : '',
        ])}
      />
    );
  };

  return (
    <div className="relative">
      {renderField()}
      <p className="text-error text-sm left-0 right-0 min-h-[25px]">
        {!!error && error}
      </p>
    </div>
  );
}

function Checkbox({ error, className, ...props }: InputFieldProps) {
  return (
    <input
      {...props}
      type="checkbox"
      className={cn(['', className, !!error ? '' : ''])}
    />
  );
}

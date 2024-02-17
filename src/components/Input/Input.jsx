import { forwardRef } from "react"
export const Input = forwardRef(
    ({ label, error, value, edit, ...rest }, ref) => {
        return (
            <>
                {label ? (
                    <label htmlFor={label} className="title headline white">
                        {label}
                    </label>
                ) : null}
                {edit ? (
                    <input className="input" ref={ref} value={value[0].title} disabled={true} />
                ) : (
                    <input className="input" {...rest} ref={ref} />
                )}
                {error ? (
                    <span className="title headline rose">{error.message}</span>
                ) : null}
            </>
        )
    }
)

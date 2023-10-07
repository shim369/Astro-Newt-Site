import { useForm } from 'react-hook-form'

type FormValues = {
  name: string
  email: string
  message: string
}

export default function ContactForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({ mode: 'onChange' })

  const onSubmit = handleSubmit(async (data) => {
    const formData = new FormData()
    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value)
    })

    await fetch('https://shim.form.newt.so/v1/deCA6xMnK', {
      method: 'POST',
      body: formData,
      headers: {
        Accept: 'application/json',
      },
    })
  })

  return (
    <section className="bg-yellow" id="a04">
        <div className="container">
            <div className="contact">
            <h1>Contact</h1>
            <form className="form-box" onSubmit={onSubmit}>
                <div className="form-item">
                <input
                    placeholder="Name"
                    id="name"
                    {...register('name', { required: 'Name is required' })}
                    aria-describedby="error-name-required"
                />
                {errors?.name && (
                    <span id="error-name-required" aria-live="assertive">
                    {errors.name.message}
                    </span>
                )}
                <input
                    placeholder="Email"
                    id="email"
                    {...register('email', { required: 'Email is required' })}
                />
                {errors?.email && (
                    <span id="error-email-required" aria-live="assertive">
                    {errors.email.message}
                    </span>
                )}
                <textarea
                    placeholder="Message"
                    id="message"
                    {...register('message', { required: 'Message is required' })}
                />
                {errors?.message && (
                    <span id="error-message-required" aria-live="assertive">
                    {errors.message.message}
                    </span>
                )}
                <button type="submit">Submit</button>
                </div>
            </form>
            <p className="reCAPTCHA">This site is protected by reCAPTCHA and the Google<br />
    <a href="https://policies.google.com/privacy">Privacy Policy</a> and
    <a href="https://policies.google.com/terms">Terms of Service</a> apply.</p>
            <div className="contact-logo">
                ASTRO BASE
                </div>
            </div>
        </div>
    </section>
  )
}
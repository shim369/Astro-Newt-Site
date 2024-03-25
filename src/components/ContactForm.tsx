import { useForm } from 'react-hook-form';

type FormValues = {
  name: string;
  email: string;
  message: string;
};

export default function ContactForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({ mode: 'onChange' });

  const onSubmit = handleSubmit(async (data) => {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value);
    });

    try {
      const response = await sendRequest(formData);
      if (response.ok) {
        window.location.href = '/thanks';
      } else {
        window.location.href = '/error';
      }
    } catch (err) {
      window.location.href = '/error';
    }
  });

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
              <span id="error-name-required" aria-live="assertive">
                {errors?.name && errors.name.message}
              </span>
              <input
                placeholder="Email"
                id="email"
                {...register('email', { required: 'Email is required' })}
                aria-describedby="error-email-required"
              />
              <span id="error-email-required" aria-live="assertive">
                {errors?.email && errors.email.message}
              </span>
              <textarea
                placeholder="Message"
                id="message"
                {...register('message', { required: 'Message is required' })}
                aria-describedby="error-message-required"
              />
              <span id="error-message-required" aria-live="assertive">
                {errors?.message && errors.message.message}
              </span>
              <button type="submit">Submit</button>
            </div>
          </form>
          <div className="contact-logo">ASTRO BASE</div>
        </div>
      </div>
    </section>
  );
}

async function sendRequest(formData: FormData) {
  return await fetch('https://shim.form.newt.so/v1/deCA6xMnK', {
    method: 'POST',
    body: formData,
    headers: {
      Accept: 'application/json',
    },
  });
}

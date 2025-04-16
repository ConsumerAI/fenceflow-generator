import React, { FormEvent } from 'react';

interface ContactFormProps {
  onSubmit: (formData: FormData) => void;
}

const ContactForm: React.FC<ContactFormProps> = ({ onSubmit }) => {
  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);
    onSubmit(formData);
  };

  return (
    <form id="contactForm" onSubmit={handleSubmit}>
      {/* Your form fields here */}
      
      <button
        className="g-recaptcha"
        data-sitekey="6LfXMgkrAAAAAO0KfRfsK7OZut3xV0edHSzYQ_5U"
        data-callback="onSubmit"
        data-action="submit"
        type="submit"
      >
        Submit
      </button>
    </form>
  );
};

export default ContactForm; 
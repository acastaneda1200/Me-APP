// validators.js
export default function useValidator(){
    const validateEmail = (email) => {
        return /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/.test(email);
    };

  return {
    validateEmail,
  };
}
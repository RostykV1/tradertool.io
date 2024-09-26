import gsap from "gsap";

export const textTyper = (element: HTMLElement, callback?: () => void) => {
  const { innerText } = element as HTMLElement;
  const splitText = innerText.split("");
  const wrappedText = splitText.map((char) => `<span>${char}</span>`).join("");
  element.innerHTML = wrappedText;
  const { children } = element;
  gsap.fromTo(
    children,
    {
      opacity: 0,
    },
    {
      delay: 0.3,
      opacity: 1,
      stagger: 0.12,
      duration: 0.2,
      ease: "power2.inOut",
      onComplete: callback,
    }
  );
};

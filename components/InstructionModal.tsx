import { type FC } from "react";
import { AiFillGithub } from "react-icons/ai";

interface InstructionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const InstructionModal: FC<InstructionModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="relative z-50 w-8/12 p-5 bg-gray-300 rounded-lg shadow-lg md:w-5/12">
        <button
          onClick={onClose}
          className="absolute text-3xl text-gray-500 right-2 top-2 hover:text-gray-700"
        >
          &times;
        </button>
        <h2 className="mb-4 text-2xl font-bold">Instructions</h2>
        <p>
          I am a true believer that our minds can come up with very insightful ideas to improve our lives. Unfortunately
          though, the issue lies in the ability to actually drive the change that we want to achieve during our lifetime
          to improve any aspect of your life
        </p>
        <br />
        <p>
          This is where Journal Genius comes in. Journal Genius stemmed from a collective desire to harness the power of
          AI to enhance personal development and self-reflection. Recognizing the potential for technology to transform
          the way we interpret and apply our own thoughts, we set out to create a tool that could distill journaling
          entries into actionable insights. We envisioned a platform that empowers individuals to extract valuable
          takeaways from their own reflections, ultimately leading to more purposeful and productive lives
        </p>
        <br />
        <p>
          In the next phase of Journal Genius, we&apos;re dedicated to enhancing the model&apos;s ability to
          communicate, creating an experience that feels remarkably human-to-human. We aim to imbue the generated
          takeaways with a natural, empathetic touch, fostering a deeper connection between the user and the insights
          provided. Ultimately, we envision a seamless process where users can effortlessly engage with Journal Genius,
          simplifying and automating the interaction to the point where a simple call to the Language Learning Model
          (LLM) becomes second nature, ensuring that the journey towards self-improvement is as intuitive and enriching
          as possible
        </p>
      </div>
      <div
        className="absolute inset-0 z-20 bg-black opacity-50"
        onClick={onClose}
      ></div>
    </div>
  );
};

export default InstructionModal;

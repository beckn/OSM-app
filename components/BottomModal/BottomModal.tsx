import { useState } from "react";
import { Transition } from "@headlessui/react";
import {AiOutlineClose} from 'react-icons/ai'
import { useLanguage } from "../../hooks/useLanguage";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  noTitle?: boolean;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children,noTitle}) => {
  const {t} = useLanguage()
  return (
    <Transition
      show={isOpen}
      
    >
      <div className="fixed z-[1000]   inset-0 flex items-end justify-center  sm:p-0">
        <Transition.Child
          enter="transition-transform duration-300"
          enterFrom="translate-y-full"
          enterTo="translate-y-0"
          leave="transition-transform duration-300"
          leaveFrom="translate-y-0"
          leaveTo="translate-y-full"
					style={{width:'100vw'}}
        >
          <div className="w-full   p-4 mx-auto bg-[#F3F4F5]  rounded-t-[1.5rem] shadow-lg sm:rounded-lg sm:overflow-hidden">
						<div className="flex justify-between">

							<h5>{noTitle ? "" :t['bottomModalTitle']}</h5>

            <button
              onClick={(e)=>{
                onClose();
              }}
            >
							<AiOutlineClose />
              
            </button>
						</div>
            {children}
          </div>
        </Transition.Child>
      </div>
    </Transition>
  );
};

export default Modal;

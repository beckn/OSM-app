import { useState } from "react";
import { Transition } from "@headlessui/react";
import {AiOutlineClose} from 'react-icons/ai'

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  noTitle?: boolean;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children,noTitle}) => {
  return (
    <Transition
      show={isOpen}
      
    >
      <div className="fixed z-[1000]   inset-0 flex items-end justify-center px-4 sm:p-0">
        <Transition.Child
          enter="transition-transform duration-300"
          enterFrom="translate-y-full"
          enterTo="translate-y-0"
          leave="transition-transform duration-300"
          leaveFrom="translate-y-0"
          leaveTo="translate-y-full"
					style={{width:'100vw'}}
        >
          <div className="w-full   p-4 mx-auto bg-[#F3F4F5]  rounded-t-lg shadow-lg sm:rounded-lg sm:overflow-hidden">
						<div className="flex justify-between">

							<h5>{noTitle ? "" : "Search"}</h5>

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

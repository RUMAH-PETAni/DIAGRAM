'use client';

import { useEffect, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  content: string;
}

export function Modal({ isOpen, onClose, title, content }: ModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  // Close modal when clicking outside of it
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      // Prevent background scrolling when modal is open
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  // Close modal with Escape key
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <div 
        ref={modalRef}
        className="w-full max-w-2xl max-h-[80vh] overflow-hidden bg-background rounded-lg shadow-lg flex flex-col"
      >
        <div className="flex justify-between items-center p-4 border-b">
          <h3 className="text font-semibold">{title}</h3>
          <button 
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground"
          >
            ✕
          </button>
        </div>
        <div className="overflow-y-auto p-4 prose prose-gray dark:prose-invert max-w-none">
          <ReactMarkdown 
            remarkPlugins={[remarkGfm]} 
            rehypePlugins={[rehypeRaw]}
            components={{
              // Custom components to ensure proper rendering
              h1: ({node, ...props}) => <h1 className="text font-bold mt-6 mb-4" {...props} />,
              h2: ({node, ...props}) => <h2 className="text font-semibold mt-5 mb-3" {...props} />,
              h3: ({node, ...props}) => <h3 className="text-sm font-medium mt-4 mb-2" {...props} />,
              p: ({node, ...props}) => <p className="text-sm my-3" {...props} />,
              ul: ({node, ...props}) => <ul className="text-sm list-disc list-inside my-3 ml-4" {...props} />,
              ol: ({node, ...props}) => <ol className="list-decimal list-inside my-3 ml-4" {...props} />,
              li: ({node, ...props}) => <li className="text-sm my-1" {...props} />,
              a: ({node, ...props}) => <a className="text-primary hover:underline" {...props} />,
              strong: ({node, ...props}) => <strong className="font-semibold" {...props} />,
              em: ({node, ...props}) => <em className="italic" {...props} />,
              blockquote: ({node, ...props}) => <blockquote className="border-l-4 border-primary pl-4 italic" {...props} />,
              // Explicitly handle form elements to prevent errors
              input: ({node, ...props}) => <input {...props} readOnly={true} />,
              select: ({node, ...props}) => <select {...props} disabled={true} />,
              textarea: ({node, ...props}) => <textarea {...props} readOnly={true} />,
            }}
          >
            {content}
          </ReactMarkdown>
        </div>
       
      </div>
    </div>
  );
}
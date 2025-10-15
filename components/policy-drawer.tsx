'use client';

import { useState, useEffect } from 'react';
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerClose, DrawerTrigger } from '@/components/ui/drawer';
import { Button } from '@/components/ui/button';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import { useI18n } from '@/lib/i18n-context';

interface PolicyDrawerProps {
  policyType: 'privacy' | 'terms';
  children: React.ReactNode;
}

export function PolicyDrawer({ policyType, children }: PolicyDrawerProps) {
  const [content, setContent] = useState('');
  const [title, setTitle] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const { locale } = useI18n();

  useEffect(() => {
    const loadPolicy = async () => {
      if (!isOpen) return;
      
      try {
        // Determine file name based on policy type and language
        let fileName = '';
        if (policyType === 'privacy') {
          fileName = locale === 'id' ? 'privacy-policy-id.md' : 'privacy-policy-en.md';
        } else {
          fileName = locale === 'id' ? 'terms-of-service-id.md' : 'terms-of-service-en.md';
        }
        
        const response = await fetch(`/${fileName}`);
        if (!response.ok) {
          // Fallback to default files if language-specific files don't exist
          fileName = policyType === 'privacy' ? 'privacy-policy.md' : 'terms-of-service.md';
          const fallbackResponse = await fetch(`/${fileName}`);
          if (!fallbackResponse.ok) {
            throw new Error(`Failed to load ${fileName}`);
          }
          const text = await fallbackResponse.text();
          setContent(text);
        } else {
          const text = await response.text();
          setContent(text);
        }
        
        // Set title based on language
        if (policyType === 'privacy') {
          setTitle(locale === 'id' ? 'Kebijakan Privasi' : 'Privacy Policy');
        } else {
          setTitle(locale === 'id' ? 'Syarat dan Ketentuan' : 'Terms & Conditions');
        }
      } catch (error) {
        console.error('Error loading policy:', error);
        setContent('Failed to load policy content.');
        setTitle(policyType === 'privacy' ? 
          (locale === 'id' ? 'Kebijakan Privasi' : 'Privacy Policy') : 
          (locale === 'id' ? 'Syarat dan Ketentuan' : 'Terms & Conditions'));
      }
    };

    loadPolicy();
  }, [isOpen, policyType, locale]);

  return (
    <Drawer open={isOpen} onOpenChange={setIsOpen}>
      <DrawerTrigger asChild>
        {children}
      </DrawerTrigger>
      <DrawerContent className="h-[80vh] max-h-[80vh]">
        <div className="overflow-y-auto h-full pb-16">
          <DrawerHeader className="sticky top-0 bg-background z-10 border-b">
            <DrawerTitle>{title}</DrawerTitle>
            
          </DrawerHeader>
          <div className="p-4 prose prose-gray dark:prose-invert max-w-none">
            {content ? (
              <ReactMarkdown 
                remarkPlugins={[remarkGfm]} 
                rehypePlugins={[rehypeRaw]}
                components={{
                  h1: ({...props}) => <h1 className="text-lg font-bold mt-6 mb-4" {...props} />,
                  h2: ({...props}) => <h2 className="text-lg font-semibold mt-5 mb-3" {...props} />,
                  h3: ({...props}) => <h3 className="text-lg font-medium mt-4 mb-2" {...props} />,
                  p: ({...props}) => <p className="text-sm my-3" {...props} />,
                  ul: ({...props}) => <ul className="text-sm list-disc list-inside my-3 ml-4" {...props} />,
                  ol: ({...props}) => <ol className="text-sm list-decimal list-inside my-3 ml-4" {...props} />,
                  li: ({...props}) => <li className="text-sm my-1" {...props} />,
                  a: ({...props}) => <a className="text-primary hover:underline" {...props} />,
                  strong: ({...props}) => <strong className="font-semibold" {...props} />,
                  em: ({...props}) => <em className="italic" {...props} />,
                  blockquote: ({...props}) => <blockquote className="border-l-4 border-primary pl-4 italic" {...props} />,
                }}
              >
                {content}
              </ReactMarkdown>
            ) : (
              <div className="flex justify-center items-center h-32">
                <p>{locale === 'id' ? 'Memuat...' : 'Loading...'}</p>
              </div>
            )}
          </div>
        </div>
        <div className="sticky bottom-0 bg-background border-t p-4 flex justify-end">
          <DrawerClose asChild>
            <Button variant="outline">
              {locale === 'id' ? 'Tutup' : 'Close'}
            </Button>
          </DrawerClose>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
"use client";

import { Button } from "@/components/retroui/ButtonCustom";
import { Blocks, DatabaseZap, Globe, MessageCircleQuestion, Handshake, House, Info, Map, Settings, Shapes, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import { Dialog } from "@/components/retroui/DialogCustom";
import { Card, CardContent } from "@/components/retroui/CardCustom"
import { Text } from "@/components/retroui/Text";
import Link from "next/link";

const Navigation = () => {
  const [mounted, setMounted] = useState(false);
  const [showModal, setShowModal] = useState(false);

  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <>
      <Button 
        className="flex items-center justify-center h-10 w-10 p-0"
        onClick={() => setShowModal(true)}>
        <Blocks />
      </Button>
      
      {/* Modal with 4 grid icons */}
      <Dialog open={showModal} onOpenChange={setShowModal}>
        <Dialog.Content size={"md"}>
          <Dialog.Header>
            <Text as="h5">Navigation Menu</Text>
          </Dialog.Header>
          <div className="grid grid-cols-2 gap-4 p-4">
            <Card className="border p-4 bg-background flex flex-col items-center justify-center">
              <House className="h-8 w-8 mb-2" />
              <Button 
              size="sm"
              className="w-full flex text-xs items-center justify-center"
              onClick={() => {
              setShowModal(false);
              window.location.href = "/";
              }}>
                Home
              </Button>
            </Card>
      
            <Card className="border p-4 bg-background flex flex-col items-center justify-center">       
            <Shapes className="h-8 w-8 mb-2" />
            <Button 
              size="sm"
              className="w-full flex text-xs items-center justify-center"
              onClick={() => {
              setShowModal(false);
              window.location.href = "/features";
            }}>
              Features
            </Button>
            </Card>

            <Card className="border p-4 bg-background flex flex-col items-center justify-center">    
            <Handshake className="h-8 w-8 mb-2" />
            <Button 
              size="sm"
              className="w-full flex text-xs items-center justify-center"
              onClick={() => {
              setShowModal(false);
              window.location.href = "/services";
            }}>
              Services
            </Button>
            </Card>

            <Card className="border p-4 bg-background flex flex-col items-center justify-center">  
            <DatabaseZap className="h-8 w-8 mb-2" />
            <Button 
              size="sm"
              className="w-full flex text-xs items-center justify-center"
              onClick={() => {
              setShowModal(false);
              window.location.href = "/data-library";
            }}>
              Library
            </Button>
            </Card>

            <Card className="border p-4 bg-background flex flex-col items-center justify-center"> 
            <Settings className="h-8 w-8 mb-2" />
            <Button 
              size="sm"
              className="w-full flex text-xs items-center justify-center"
              onClick={() => {
              setShowModal(false);
              window.location.href = "/Settings";
            }}>
              Settings
            </Button>
            </Card>

            <Card className="border p-4 bg-background flex flex-col items-center justify-center"> 
            <MessageCircleQuestion className="h-8 w-8 mb-2" />
            <Button 
              size="sm"
              className="w-full flex text-xs items-center justify-center"
              onClick={() => {
              setShowModal(false);
              window.location.href = "/faq";
            }}>
              F.A.Q
            </Button>
            </Card>
          </div>
        </Dialog.Content>
      </Dialog>
    </>
  );
};

export { Navigation };

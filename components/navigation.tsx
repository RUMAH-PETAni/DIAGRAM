"use client";

import { Button } from "@/components/retroui/ButtonCustom";
import { Blocks, DatabaseZap, Globe, Handshake, House, Info, Map, Settings, Shapes, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
} from "@/components/retroui/DialogCustom";
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
        <DialogContent className="w-full max-w-full sm:max-w-md sm:mx-auto p-4">
          <div className="grid grid-cols-2 gap-4">
            <Button className="flex flex-col items-center justify-center p-4" onClick={() => {
              setShowModal(false);
              window.location.href = "/";
            }}>
              <House className="h-8 w-8 mb-2" />
              <span className="text-sm">Home</span>
            </Button>
            <Button className="flex flex-col items-center justify-center p-4" onClick={() => {
              setShowModal(false);
              window.location.href = "/features";
            }}>
              <Shapes className="h-8 w-8 mb-2" />
              <span className="text-sm">Features</span>
            </Button>
            <Button className="flex flex-col items-center justify-center p-4" onClick={() => {
              setShowModal(false);
              window.location.href = "/services";
            }}>
              <Handshake className="h-8 w-8 mb-2" />
              <span className="text-sm">Services</span>
            </Button>
            <Button className="flex flex-col items-center justify-center p-4" onClick={() => {
              setShowModal(false);
              window.location.href = "/data-library";
            }}>
              <DatabaseZap className="h-8 w-8 mb-2" />
              <span className="text-sm">Library</span>
            </Button>
            <Button className="flex flex-col items-center justify-center p-4" onClick={() => {
              setShowModal(false);
              window.location.href = "/Settings";
            }}>
              <Settings className="h-8 w-8 mb-2" />
              <span className="text-sm">Settings</span>
            </Button>
             <Button className="flex flex-col items-center justify-center p-4" onClick={() => {
              setShowModal(false);
              window.location.href = "/about";
            }}>
              <Info className="h-8 w-8 mb-2" />
              <span className="text-sm">About</span>
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export { Navigation };

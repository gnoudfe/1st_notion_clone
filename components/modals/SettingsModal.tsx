"use client";

import { Label } from "@/components/ui//label";
import { ThemeSwitcher } from "../ThemeSwitcher";
import { useSettings } from "@/hooks/useSettings";
import { Dialog, DialogContent, DialogHeader } from "../ui/dialog";
import { DialogTitle } from "@radix-ui/react-dialog";
import { SignOutButton } from "@clerk/clerk-react";

export function SettingsModal() {
  const settings = useSettings();

  return (
    <Dialog open={settings.isOpen} onOpenChange={settings.onClose}>
      <DialogContent>
        <DialogTitle>
          <DialogHeader className="border-b pb-3">
            <h2 className="text-lg font-medium">My settings</h2>
          </DialogHeader>
          <div className="flex items-center justify-between mt-4">
            <div className="flex flex-col gap-y-1">
              <Label>Apperance</Label>
              <span className="text-[0.8rem] text-muted-foreground">
                Customize how Jotion looks on your device
              </span>
            </div>
            <ThemeSwitcher />
          </div>
          <div className="flex items-center justify-between mt-4">
            <div className="flex flex-col gap-y-1">
              <Label>Logout</Label>
              <span className="text-[0.8rem] text-muted-foreground">
                Log out of all other active sessions.
              </span>
            </div>
            <SignOutButton>
              <div
                role="button"
                className="text-sm border px-2 py-1 rounded-sm cursor-pointer hover:bg-primary/10 transition-all ease-in-out duration-300 translate-y-[4px]"
              >
                Logout
              </div>
            </SignOutButton>
          </div>
        </DialogTitle>
      </DialogContent>
    </Dialog>
  );
}

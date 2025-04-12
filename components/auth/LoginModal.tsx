// components/auth/LoginModal.tsx
"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { User } from "lucide-react";
import { signIn } from "next-auth/react";
import Image from "next/image";
import { useState } from "react";

export const LoginModal = () => {
  const [email, setEmail] = useState("follower@gmail.com");
  const [password, setPassword] = useState("123");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async () => {
    setIsLoading(true);
    try {
      const res = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });
      if (res?.error) {
        setError(res?.error);
      }
    } catch (error) {
      // setError(error);
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" className="rounded-full">
          <User className="h-5 w-5" />
          <span className="sr-only">Login</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader className="text-left">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-2xl font-bold">Đăng nhập</DialogTitle>
          </div>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="Email hoặc số điện thoại của bạn..."
              className="w-full bg-[#1f1f1f] border-0"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <Label htmlFor="password">Mật khẩu</Label>
              <Button
                variant="link"
                className="text-blue-500 p-0 h-auto font-normal"
              >
                Quên mật khẩu?
              </Button>
            </div>
            <Input
              id="password"
              type="password"
              placeholder="Mật khẩu của bạn..."
              className="w-full bg-[#1f1f1f] border-0"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {error && (
            <div className="text-red-500 text-sm">{error}</div>
          )}
          <Button
            className="w-full bg-blue-600 hover:bg-blue-700 text-white"
            onClick={handleLogin}
            disabled={isLoading}
          >
            {isLoading ? "Đang đăng nhập..." : "Đăng nhập"}
          </Button>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Hoặc
              </span>
            </div>
          </div>

          <div className="grid gap-2">
            <Button variant="outline" className="w-full">
              <Image
                src="/google.svg"
                alt="Google"
                width={20}
                height={20}
                className="mr-2"
              />
              Google
            </Button>
            <Button variant="outline" className="w-full">
              <Image
                src="/facebook.svg"
                alt="Facebook"
                width={20}
                height={20}
                className="mr-2"
              />
              Facebook
            </Button>
            <Button variant="outline" className="w-full">
              <Image
                src="/apple.svg"
                alt="Apple"
                width={20}
                height={20}
                className="mr-2"
              />
              Apple
            </Button>
          </div>

          <div className="text-center text-sm text-muted-foreground">
            Bạn chưa có tài khoản?{" "}
            <Button
              variant="link"
              className="text-blue-500 p-0 h-auto font-normal"
            >
              Đăng ký
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { signIn } from "next-auth/react";
import { useState } from "react";

export default function LoginPage() {
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
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="p-4 max-w-lg1 mx-auto">
      <div className="space-y-2">
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
      {error && <div className="text-red-500 text-sm">{error}</div>}
      <Button
        className="w-full bg-blue-600 hover:bg-blue-700 text-white"
        onClick={handleLogin}
        disabled={isLoading}
      >
        {isLoading ? "Đang đăng nhập..." : "Đăng nhập"}
      </Button>
    </div>
  );
}

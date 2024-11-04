import { useState } from "react";
import { type MetaFunction, type LoaderFunctionArgs } from "@remix-run/node";
import { Form, json, useLoaderData } from "@remix-run/react";
import { motion } from "framer-motion";
import { supabaseClient } from "@/services/supabase.server";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { LockIcon, MailIcon } from "lucide-react";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const { supabase } = supabaseClient(request);
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return json({ user });
};

export default function Index() {
  const { user } = useLoaderData<typeof loader>();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // ここにログイン処理を追加
    console.log("Login attempt", { email, password });
  };
  return !user ? (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-500 to-pink-500 p-4">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center">
              ログイン
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Form action="/signin" method="post" className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="sr-only">
                  メールアドレス
                </Label>
                <div className="relative">
                  <MailIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="メールアドレス"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="password" className="sr-only">
                  パスワード
                </Label>
                <div className="relative">
                  <LockIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="パスワード"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>
              <Button type="submit" className="w-full">
                ログイン
              </Button>
            </Form>
          </CardContent>
          <CardFooter className="flex justify-center">
            <a href="#" className="text-sm text-blue-600 hover:underline">
              パスワードをお忘れですか？
            </a>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  ) : (
    <main className="p-6">
      <h1 className="mb-1">TOP PAGE</h1>
      <p>user: {user.id}</p>
      <Form action="/signout" method="post">
        <Button type="submit">ログアウト</Button>
      </Form>
    </main>
  );
}

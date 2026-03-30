// src/components/Footer.js
"use client"; // 声明为客户端组件，因为使用了 useState 和 useEffect

import React, { useEffect, useState } from "react";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const [wakatimeText, setWakatimeText] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWakatimeStats = async () => {
      setIsLoading(true);
      setError(null);
      try {
        // 请将 'YOUR_WORKER_URL' 替换为您实际部署的 Cloudflare Worker URL
        const workerUrl = "https://waka.yangzh.cn";
        const response = await fetch(workerUrl);

        if (!response.ok) {
          const errorData = await response
            .json()
            .catch(() => ({ message: "Failed to parse error response" }));
          throw new Error(
            errorData.message ||
              `Error fetching Wakatime stats: ${response.status}`
          );
        }

        const result = await response.json();

        // 根据您提供的 JSON 结构，我们期望数据在 result.data.text
        if (result && result.data && result.data.text) {
          setWakatimeText(result.data.text);
        } else {
          // 如果数据结构不符合预期，或者 text 字段不存在
          console.warn(
            'Wakatime data received, but "text" field is missing or in unexpected structure:',
            result
          );
          setWakatimeText("Data format error");
        }
      } catch (err) {
        console.error("Failed to fetch or process Wakatime stats:", err);
        setError(err.message);
        setWakatimeText("Could not load stats");
      } finally {
        setIsLoading(false);
      }
    };

    fetchWakatimeStats();
  }, []); // 空依赖数组确保只在组件挂载时运行一次

  return (
    <footer className="bg-slate-800 text-slate-300 py-8 mt-12">
      <div className="container mx-auto px-4 text-center">
        <p className="text-sm">
          &copy; {currentYear} 《Web前端开发》课程练习平台. 保留所有权利.
        </p>
        <p className="text-xs mt-2">使用 Next.js 和 Tailwind CSS 构建</p>
        <p className="text-xs mt-2">
          Wakatime :{" "}
          {isLoading ? "Loading..." : error ? `Error: ${error}` : wakatimeText}
        </p>

      </div>
    </footer>
  );
}

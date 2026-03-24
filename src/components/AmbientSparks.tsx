import { CSSProperties } from "react";
import { cn } from "@/lib/utils";

const SPARKS = [
  { x: "2%", y: "8%", size: "4px", delay: "-2.4s", duration: "14s", opacity: "0.95" },
  { x: "8%", y: "26%", size: "3px", delay: "-1.2s", duration: "11s", opacity: "0.78" },
  { x: "15%", y: "72%", size: "5px", delay: "-4.8s", duration: "16s", opacity: "0.92" },
  { x: "22%", y: "18%", size: "2px", delay: "-3s", duration: "13s", opacity: "0.64" },
  { x: "28%", y: "54%", size: "4px", delay: "-6.2s", duration: "18s", opacity: "0.8" },
  { x: "34%", y: "36%", size: "6px", delay: "-8.1s", duration: "15s", opacity: "0.88" },
  { x: "39%", y: "86%", size: "3px", delay: "-5.2s", duration: "12s", opacity: "0.7" },
  { x: "46%", y: "24%", size: "4px", delay: "-7.6s", duration: "17s", opacity: "0.83" },
  { x: "52%", y: "62%", size: "5px", delay: "-2.9s", duration: "16s", opacity: "0.9" },
  { x: "58%", y: "10%", size: "2px", delay: "-1.6s", duration: "10s", opacity: "0.6" },
  { x: "63%", y: "42%", size: "3px", delay: "-6.8s", duration: "14s", opacity: "0.72" },
  { x: "68%", y: "78%", size: "6px", delay: "-9.3s", duration: "19s", opacity: "0.94" },
  { x: "72%", y: "28%", size: "3px", delay: "-3.4s", duration: "12s", opacity: "0.68" },
  { x: "77%", y: "58%", size: "4px", delay: "-8.7s", duration: "15s", opacity: "0.84" },
  { x: "82%", y: "14%", size: "5px", delay: "-4.5s", duration: "17s", opacity: "0.88" },
  { x: "88%", y: "34%", size: "3px", delay: "-2.1s", duration: "11s", opacity: "0.7" },
  { x: "92%", y: "70%", size: "4px", delay: "-7.3s", duration: "16s", opacity: "0.82" },
  { x: "97%", y: "18%", size: "2px", delay: "-5.5s", duration: "13s", opacity: "0.58" },
  { x: "6%", y: "90%", size: "3px", delay: "-1.8s", duration: "12s", opacity: "0.66" },
  { x: "18%", y: "44%", size: "2px", delay: "-9.1s", duration: "10s", opacity: "0.55" },
  { x: "31%", y: "12%", size: "4px", delay: "-6.4s", duration: "14s", opacity: "0.78" },
  { x: "41%", y: "68%", size: "3px", delay: "-4.1s", duration: "13s", opacity: "0.72" },
  { x: "54%", y: "84%", size: "2px", delay: "-7.8s", duration: "11s", opacity: "0.6" },
  { x: "66%", y: "6%", size: "5px", delay: "-2.7s", duration: "15s", opacity: "0.86" },
  { x: "74%", y: "92%", size: "3px", delay: "-8.9s", duration: "17s", opacity: "0.74" },
  { x: "86%", y: "52%", size: "2px", delay: "-3.7s", duration: "12s", opacity: "0.62" },
  { x: "4%", y: "14%", size: "2px", delay: "-6.1s", duration: "11s", opacity: "0.64" },
  { x: "11%", y: "58%", size: "4px", delay: "-4.4s", duration: "15s", opacity: "0.84" },
  { x: "19%", y: "6%", size: "3px", delay: "-2.5s", duration: "13s", opacity: "0.7" },
  { x: "24%", y: "82%", size: "2px", delay: "-9.4s", duration: "10s", opacity: "0.58" },
  { x: "29%", y: "30%", size: "5px", delay: "-5.8s", duration: "17s", opacity: "0.9" },
  { x: "36%", y: "64%", size: "2px", delay: "-1.9s", duration: "12s", opacity: "0.62" },
  { x: "43%", y: "16%", size: "3px", delay: "-8.2s", duration: "14s", opacity: "0.74" },
  { x: "48%", y: "48%", size: "2px", delay: "-3.8s", duration: "11s", opacity: "0.56" },
  { x: "57%", y: "90%", size: "4px", delay: "-7.1s", duration: "16s", opacity: "0.82" },
  { x: "61%", y: "20%", size: "2px", delay: "-6.6s", duration: "12s", opacity: "0.6" },
  { x: "69%", y: "40%", size: "5px", delay: "-2.2s", duration: "15s", opacity: "0.86" },
  { x: "73%", y: "66%", size: "2px", delay: "-5.1s", duration: "11s", opacity: "0.6" },
  { x: "79%", y: "8%", size: "3px", delay: "-4.6s", duration: "13s", opacity: "0.72" },
  { x: "84%", y: "86%", size: "4px", delay: "-8.4s", duration: "17s", opacity: "0.8" },
  { x: "90%", y: "24%", size: "2px", delay: "-1.5s", duration: "10s", opacity: "0.58" },
  { x: "95%", y: "60%", size: "5px", delay: "-7.7s", duration: "16s", opacity: "0.88" },
  { x: "13%", y: "96%", size: "2px", delay: "-5.9s", duration: "12s", opacity: "0.56" },
  { x: "27%", y: "96%", size: "3px", delay: "-2.8s", duration: "13s", opacity: "0.66" },
  { x: "49%", y: "4%", size: "4px", delay: "-6.9s", duration: "14s", opacity: "0.78" },
  { x: "93%", y: "94%", size: "3px", delay: "-3.3s", duration: "15s", opacity: "0.72" }
] as const;

export function AmbientSparks({ className }: { className?: string }) {
  return (
    <div className={cn("spark-field", className)} aria-hidden="true">
      {SPARKS.map((spark, index) => (
        <span
          key={`${spark.x}-${spark.y}-${index}`}
          className="spark"
          style={
            {
              "--spark-x": spark.x,
              "--spark-y": spark.y,
              "--spark-size": spark.size,
              "--spark-delay": spark.delay,
              "--spark-duration": spark.duration,
              "--spark-opacity": spark.opacity
            } as CSSProperties
          }
        />
      ))}
    </div>
  );
}

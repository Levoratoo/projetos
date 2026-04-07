import { CSSProperties } from "react";
import { cn } from "@/lib/utils";

/** 90 estrelas distribuídas pelo viewport — mistura de distantes (1px) a brilhantes (6px) */
const SPARKS = [
  { x: "1%",  y: "6%",  size: "2px", delay: "-2.4s",  duration: "14s", opacity: "0.85" },
  { x: "4%",  y: "22%", size: "1px", delay: "-1.2s",  duration: "11s", opacity: "0.5"  },
  { x: "7%",  y: "48%", size: "3px", delay: "-4.8s",  duration: "16s", opacity: "0.9"  },
  { x: "3%",  y: "71%", size: "1px", delay: "-3.0s",  duration: "13s", opacity: "0.55" },
  { x: "9%",  y: "88%", size: "2px", delay: "-6.2s",  duration: "18s", opacity: "0.72" },
  { x: "6%",  y: "35%", size: "5px", delay: "-8.1s",  duration: "15s", opacity: "0.95" },
  { x: "12%", y: "14%", size: "1px", delay: "-5.2s",  duration: "12s", opacity: "0.48" },
  { x: "14%", y: "57%", size: "2px", delay: "-7.6s",  duration: "17s", opacity: "0.78" },
  { x: "11%", y: "80%", size: "4px", delay: "-2.9s",  duration: "16s", opacity: "0.88" },
  { x: "16%", y: "30%", size: "1px", delay: "-1.6s",  duration: "10s", opacity: "0.52" },
  { x: "18%", y: "95%", size: "3px", delay: "-6.8s",  duration: "14s", opacity: "0.75" },
  { x: "20%", y: "42%", size: "6px", delay: "-9.3s",  duration: "19s", opacity: "0.98" },
  { x: "22%", y: "10%", size: "1px", delay: "-3.4s",  duration: "12s", opacity: "0.5"  },
  { x: "25%", y: "66%", size: "2px", delay: "-8.7s",  duration: "15s", opacity: "0.8"  },
  { x: "23%", y: "82%", size: "1px", delay: "-4.5s",  duration: "17s", opacity: "0.46" },
  { x: "28%", y: "24%", size: "3px", delay: "-2.1s",  duration: "11s", opacity: "0.87" },
  { x: "30%", y: "52%", size: "1px", delay: "-7.3s",  duration: "16s", opacity: "0.54" },
  { x: "27%", y: "4%",  size: "4px", delay: "-5.5s",  duration: "13s", opacity: "0.9"  },
  { x: "32%", y: "76%", size: "2px", delay: "-1.8s",  duration: "12s", opacity: "0.7"  },
  { x: "34%", y: "38%", size: "1px", delay: "-9.1s",  duration: "10s", opacity: "0.44" },
  { x: "36%", y: "90%", size: "3px", delay: "-6.4s",  duration: "14s", opacity: "0.82" },
  { x: "38%", y: "18%", size: "1px", delay: "-4.1s",  duration: "13s", opacity: "0.5"  },
  { x: "40%", y: "60%", size: "5px", delay: "-7.8s",  duration: "11s", opacity: "0.96" },
  { x: "42%", y: "32%", size: "1px", delay: "-2.7s",  duration: "15s", opacity: "0.48" },
  { x: "44%", y: "85%", size: "2px", delay: "-8.9s",  duration: "17s", opacity: "0.74" },
  { x: "46%", y: "8%",  size: "3px", delay: "-3.7s",  duration: "12s", opacity: "0.88" },
  { x: "48%", y: "46%", size: "1px", delay: "-6.1s",  duration: "11s", opacity: "0.5"  },
  { x: "50%", y: "72%", size: "4px", delay: "-4.4s",  duration: "15s", opacity: "0.92" },
  { x: "52%", y: "20%", size: "1px", delay: "-2.5s",  duration: "13s", opacity: "0.46" },
  { x: "54%", y: "94%", size: "2px", delay: "-9.4s",  duration: "10s", opacity: "0.68" },
  { x: "56%", y: "55%", size: "3px", delay: "-5.8s",  duration: "17s", opacity: "0.84" },
  { x: "58%", y: "12%", size: "1px", delay: "-1.9s",  duration: "12s", opacity: "0.52" },
  { x: "60%", y: "36%", size: "6px", delay: "-8.2s",  duration: "14s", opacity: "0.97" },
  { x: "62%", y: "78%", size: "1px", delay: "-3.8s",  duration: "11s", opacity: "0.5"  },
  { x: "64%", y: "26%", size: "2px", delay: "-7.1s",  duration: "16s", opacity: "0.78" },
  { x: "66%", y: "64%", size: "3px", delay: "-6.6s",  duration: "12s", opacity: "0.86" },
  { x: "68%", y: "6%",  size: "1px", delay: "-2.2s",  duration: "15s", opacity: "0.48" },
  { x: "70%", y: "88%", size: "4px", delay: "-5.1s",  duration: "11s", opacity: "0.9"  },
  { x: "72%", y: "42%", size: "1px", delay: "-4.6s",  duration: "13s", opacity: "0.54" },
  { x: "74%", y: "16%", size: "2px", delay: "-8.4s",  duration: "17s", opacity: "0.8"  },
  { x: "76%", y: "70%", size: "1px", delay: "-1.5s",  duration: "10s", opacity: "0.46" },
  { x: "78%", y: "30%", size: "5px", delay: "-7.7s",  duration: "16s", opacity: "0.95" },
  { x: "80%", y: "58%", size: "1px", delay: "-5.9s",  duration: "12s", opacity: "0.52" },
  { x: "82%", y: "2%",  size: "3px", delay: "-2.8s",  duration: "13s", opacity: "0.83" },
  { x: "84%", y: "82%", size: "1px", delay: "-6.9s",  duration: "14s", opacity: "0.5"  },
  { x: "86%", y: "46%", size: "2px", delay: "-3.3s",  duration: "15s", opacity: "0.76" },
  { x: "88%", y: "22%", size: "4px", delay: "-9.2s",  duration: "11s", opacity: "0.91" },
  { x: "90%", y: "68%", size: "1px", delay: "-4.0s",  duration: "16s", opacity: "0.5"  },
  { x: "92%", y: "40%", size: "2px", delay: "-7.5s",  duration: "13s", opacity: "0.78" },
  { x: "94%", y: "92%", size: "3px", delay: "-1.3s",  duration: "17s", opacity: "0.85" },
  { x: "96%", y: "14%", size: "1px", delay: "-6.7s",  duration: "10s", opacity: "0.48" },
  { x: "98%", y: "54%", size: "2px", delay: "-3.6s",  duration: "14s", opacity: "0.72" },
  { x: "5%",  y: "59%", size: "1px", delay: "-8.6s",  duration: "12s", opacity: "0.5"  },
  { x: "13%", y: "3%",  size: "2px", delay: "-5.3s",  duration: "11s", opacity: "0.7"  },
  { x: "19%", y: "74%", size: "1px", delay: "-2.0s",  duration: "15s", opacity: "0.46" },
  { x: "26%", y: "46%", size: "3px", delay: "-9.7s",  duration: "16s", opacity: "0.86" },
  { x: "33%", y: "8%",  size: "1px", delay: "-4.2s",  duration: "13s", opacity: "0.52" },
  { x: "39%", y: "50%", size: "2px", delay: "-7.0s",  duration: "12s", opacity: "0.75" },
  { x: "45%", y: "30%", size: "4px", delay: "-3.1s",  duration: "18s", opacity: "0.93" },
  { x: "51%", y: "84%", size: "1px", delay: "-8.0s",  duration: "11s", opacity: "0.5"  },
  { x: "57%", y: "40%", size: "2px", delay: "-5.0s",  duration: "14s", opacity: "0.8"  },
  { x: "63%", y: "96%", size: "1px", delay: "-1.7s",  duration: "10s", opacity: "0.44" },
  { x: "69%", y: "50%", size: "5px", delay: "-6.3s",  duration: "17s", opacity: "0.96" },
  { x: "75%", y: "76%", size: "1px", delay: "-9.0s",  duration: "13s", opacity: "0.5"  },
  { x: "81%", y: "12%", size: "3px", delay: "-4.7s",  duration: "15s", opacity: "0.82" },
  { x: "87%", y: "60%", size: "1px", delay: "-2.3s",  duration: "12s", opacity: "0.48" },
  { x: "93%", y: "28%", size: "2px", delay: "-7.9s",  duration: "11s", opacity: "0.74" },
  { x: "99%", y: "78%", size: "1px", delay: "-5.6s",  duration: "16s", opacity: "0.5"  },
  { x: "10%", y: "98%", size: "2px", delay: "-3.5s",  duration: "14s", opacity: "0.68" },
  { x: "21%", y: "60%", size: "1px", delay: "-8.3s",  duration: "10s", opacity: "0.46" },
  { x: "31%", y: "88%", size: "3px", delay: "-1.4s",  duration: "13s", opacity: "0.84" },
  { x: "43%", y: "70%", size: "1px", delay: "-6.5s",  duration: "12s", opacity: "0.52" },
  { x: "55%", y: "28%", size: "2px", delay: "-4.3s",  duration: "15s", opacity: "0.76" },
  { x: "67%", y: "54%", size: "4px", delay: "-9.6s",  duration: "17s", opacity: "0.92" },
  { x: "79%", y: "98%", size: "1px", delay: "-2.6s",  duration: "11s", opacity: "0.48" },
  { x: "91%", y: "4%",  size: "3px", delay: "-7.2s",  duration: "14s", opacity: "0.86" },
  { x: "2%",  y: "40%", size: "1px", delay: "-5.7s",  duration: "13s", opacity: "0.5"  },
  { x: "15%", y: "20%", size: "6px", delay: "-3.2s",  duration: "19s", opacity: "0.98" },
  { x: "35%", y: "62%", size: "1px", delay: "-8.8s",  duration: "10s", opacity: "0.46" },
  { x: "47%", y: "16%", size: "2px", delay: "-1.1s",  duration: "16s", opacity: "0.78" },
  { x: "59%", y: "48%", size: "1px", delay: "-6.0s",  duration: "12s", opacity: "0.54" },
  { x: "71%", y: "32%", size: "3px", delay: "-4.9s",  duration: "15s", opacity: "0.88" },
  { x: "83%", y: "74%", size: "1px", delay: "-9.5s",  duration: "11s", opacity: "0.5"  },
  { x: "95%", y: "44%", size: "2px", delay: "-2.9s",  duration: "14s", opacity: "0.74" },
  { x: "37%", y: "4%",  size: "1px", delay: "-7.4s",  duration: "13s", opacity: "0.48" },
  { x: "53%", y: "98%", size: "4px", delay: "-5.4s",  duration: "18s", opacity: "0.91" },
  { x: "77%", y: "18%", size: "1px", delay: "-3.9s",  duration: "10s", opacity: "0.5"  },
  { x: "8%",  y: "62%", size: "2px", delay: "-8.5s",  duration: "15s", opacity: "0.72" },
  { x: "24%", y: "36%", size: "1px", delay: "-1.0s",  duration: "12s", opacity: "0.46" },
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

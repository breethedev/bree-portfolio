import s from "./useless-hooks.module.css";
import { Card } from "@/components/Card/Card";
import { hooksData } from "./hooks/hooksData";
import Link from "next/link";

export default function Hooks() {
  return (
    <section className={`${s.hooks} container`}>
      <div className={s.hooks__header}>
        <h1>Useless Hooks Playground</h1>

        <h3>
          Here are the demos from this <Link href="/five-useless-hooks">useless hook article</Link>
        </h3>
      </div>

      <div className={s.hooks_container}>
        {hooksData.map((hook) => (
          <Card
            key={hook.name}
            title={hook.name}
            description={hook.description}
            linkUrl={`/useless-hooks/${hook.name}`}
          />
        ))}
      </div>
    </section>
  );
}

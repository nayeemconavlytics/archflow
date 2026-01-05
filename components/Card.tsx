"use client";

type CardProps = {
  meta: string;
  title: string;
  desc: string;
};

export default function Card({ meta, title, desc }: CardProps) {
  return (
    <div className="card group">
      <div className="card-meta">{meta}</div>

      <h3 className="card-title">
        {title}
      </h3>

      <p className="card-desc">
        {desc}
      </p>
    </div>
  );
}

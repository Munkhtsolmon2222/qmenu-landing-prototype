import Link from 'next/link';
import React from 'react';

const PlatformInfo = () => {
  return (
    <section className="flex flex-col items-center justify-center text-center py-16 mt-4">
      <h2 className="text-4xl font-bold mb-4"></h2>
      <p className="text-lg mb-8 max-w-2xl">
        Бизнес тань өсөж хөгжихөд хэрэгтэй бүх зүйл нэг дор. Манай платформ нь борлуулалтаа
        нэмэгдүүлэх, хуанлигаа удирдах, үйлчлүүлэгчдээ хадгалах хэрэгслүүдээр бүрэн тоноглогдсон тул
        та өөрийн хамгийн сайн хийж чаддаг зүйлдээ төвлөрөх боломжтой.{' '}
      </p>
      <a href="tel:77772040">
        <button className="bg-black text-white px-6 py-3 rounded-full">Бүртгүүлэх</button>
      </a>
    </section>
  );
};

export default PlatformInfo;

'use client';

import { useState, useEffect } from 'react';
import { Check, Plus } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function PricingPage() {
  const [activeTab, setActiveTab] = useState('сар');
  const [activeAddOnTab, setActiveAddOnTab] = useState('сар');
  const pricingData = {
    сар: {
      lite: {
        price: '30,000',
        features: ['Цахим төлбөр', 'Ухаалаг QR цэс', 'Ширээ удирдлага', 'Цэс удирдлага'],
      },
      standard: {
        price: '60,000',
        features: [
          'Lite багц',
          'Кассын систем',
          'Хүргэлт/Захиалга',
          'Хөнгөлөлт, хураамж',
          'Dashboard, Тайлан',
        ],
      },
      plus: {
        price: '150,000',
        features: ['Standart багц', 'Касс', 'Тайлан', 'Гал тогоо удирдлага', 'Inventory'],
      },
      addons: {
        small: '20,000',
        large: '40,000',
      },
    },
    улирал: {
      lite: {
        price: '90,000',
        features: ['Үндсэн дэлгэц', 'НӨАТ', 'Ширээ удирдлага', 'Захиалга'],
      },
      standard: {
        price: '180,000',
        features: [
          'Lite багц',
          'Хөнгөлөлт',
          'Хураамж',
          'Гишүүнчлэлийн удирдлага',
          'Dashboard, Тайлан',
        ],
      },
      plus: {
        price: '450,000',
        features: ['Standart багц', 'Loyalty', 'KDS', 'Kiosk', 'Inventory'],
      },
      addons: {
        small: '60,000',
        large: '120,000',
      },
    },
    'хагас жил': {
      lite: {
        price: '180,000',
        features: ['Үндсэн дэлгэц', 'НӨАТ', 'Ширээ удирдлага', 'Захиалга'],
      },
      standard: {
        price: '360,000',
        features: [
          'Lite багц',
          'Хөнгөлөлт',
          'Хураамж',
          'Гишүүнчлэлийн удирдлага',
          'Dashboard, Тайлан',
        ],
      },
      plus: {
        price: '900,000',
        features: ['Standart багц', 'Касс', 'Тайлан', 'Гал тогоо удирдлага', 'Inventory'],
      },
      addons: {
        small: '120,000',
        large: '240,000',
      },
    },
    жил: {
      lite: {
        price: '320,000',
        features: ['Үндсэн дэлгэц', 'НӨАТ', 'Ширээ удирдлага', 'Захиалга'],
      },
      standard: {
        price: '720,000',
        features: [
          'Lite багц',
          'Хөнгөлөлт',
          'Хураамж',
          'Гишүүнчлэлийн удирдлага',
          'Dashboard, Тайлан',
        ],
      },
      plus: {
        price: '1,800,000',
        features: ['Standart багц', 'Касс', 'Тайлан', 'Гал тогоо удирдлага', 'Inventory'],
      },
      addons: {
        small: '220,000',
        large: '440,000',
      },
    },
  };

  const currentPricing = pricingData[activeTab as keyof typeof pricingData];

  const [addonModules, setAddonModules] = useState([
    { name: 'Гал тогоо удирдлага (KDS)', price: currentPricing.addons.small },
    { name: 'Ухаалаг тайлан', price: currentPricing.addons.small },
    { name: 'Gift card, Vaucher, Coupon', price: currentPricing.addons.small },
    { name: 'Бараа материалын удирдлага', price: currentPricing.addons.large },
    { name: 'Санхүүгийн удирдлага', price: currentPricing.addons.large },
  ]);

  useEffect(() => {
    const newAddonPrices =
      activeAddOnTab === 'жил'
        ? { small: '220,000', large: '440,000' }
        : { small: '20,000', large: '40,000' };
    setAddonModules([
      { name: 'Гал тогоо удирдлага (KDS)', price: newAddonPrices.small },
      { name: 'Ухаалаг тайлан', price: newAddonPrices.small },
      { name: 'Gift card, Vaucher, Coupon', price: newAddonPrices.small },
      { name: 'Бараа материалын удирдлага', price: newAddonPrices.large },
      { name: 'Санхүүгийн удирдлага', price: newAddonPrices.large },
    ]);
  }, [activeAddOnTab]);

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-8 max-w-6xl rounded-xl bg-white">
        <div className="mb-8">
          <h1 className="text-xl font-bold uppercase">Үнийн санал</h1>
          <p className="text-gray-600 mt-1">
            Та хүссэн үйлдэз сонгосон багцаа багтаатж эсвэл эмилүх болно.
          </p>
        </div>

        <div className="flex rounded-full bg-gray-100 p-1 mb-12 max-w-md">
          <button
            className={cn(
              'flex-1 py-2 px-4 rounded-full text-sm font-medium transition-colors',
              activeTab === 'сар' ? 'bg-black text-white' : 'text-gray-700 hover:bg-gray-200',
            )}
            onClick={() => setActiveTab('сар')}
          >
            Сар
          </button>
          <button
            className={cn(
              'flex-1 py-2 px-4 rounded-full text-sm font-medium transition-colors',
              activeTab === 'улирал' ? 'bg-black text-white' : 'text-gray-700 hover:bg-gray-200',
            )}
            onClick={() => setActiveTab('улирал')}
          >
            Улирал
          </button>
          <button
            className={cn(
              'flex-1 py-2 px-4 rounded-full text-sm font-medium transition-colors',
              activeTab === 'хагас жил' ? 'bg-black text-white' : 'text-gray-700 hover:bg-gray-200',
            )}
            onClick={() => setActiveTab('хагас жил')}
          >
            Хагас жил
          </button>
          <button
            className={cn(
              'flex-1 py-2 px-4 rounded-full text-sm font-medium transition-colors',
              activeTab === 'жил' ? 'bg-black text-white' : 'text-gray-700 hover:bg-gray-200',
            )}
            onClick={() => setActiveTab('жил')}
          >
            Жил
          </button>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="border rounded-3xl p-6 flex flex-col">
            <div className="bg-black text-center py-3 rounded-full mb-6">
              <h3 className="font-bold text-white">LITE БАГЦ</h3>
            </div>
            <h2 className="text-3xl font-bold text-center mb-2">
              {currentPricing.lite.price} <span className="text-sm">төг</span>
            </h2>
            <p className="text-sm text-gray-600 mb-6">
              Захиалгаа зайнаас өгч, зайнаас төлөх боломжийг олгох цаг, цалин хэмнэсэн багц{' '}
            </p>
            <div className="space-y-3 mb-6 flex-grow">
              {currentPricing.lite.features.map((feature, index) => (
                <div key={index} className="flex items-center">
                  <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center mr-2">
                    <Check className="w-4 h-4 text-green-600" />
                  </div>
                  <span className="text-sm">{feature}</span>
                </div>
              ))}
            </div>
            <div className="mt-auto mx-auto space-y-3">
              <a
                className="w-full py-2 px-4 border border-black rounded-full text-sm hover:bg-gray-800 hover:text-white transition-colors mx-auto"
                href="tel:77772040"
              >
                Туршиж үзэх
              </a>
            </div>
          </div>

          <div className="border rounded-3xl p-6 flex flex-col relative">
            <div className="absolute -top-3 -right-3 bg-red-500 text-white rounded-full w-14 h-14 flex items-center justify-center">
              <div className="text-center">
                <div className="thumbs-up-icon">👍</div>
                <div className="text-[8px]">САНАЛ БОЛГОХ</div>
              </div>
            </div>
            <div className="bg-black text-center py-3 rounded-full mb-6">
              <h3 className="font-bold text-white">STANDART БАГЦ</h3>
            </div>
            <h2 className="text-3xl font-bold text-center mb-2">
              {currentPricing.standard.price} <span className="text-sm">төг</span>
            </h2>
            <p className="text-sm text-gray-600 mb-6">
              Өөртөө Lite багцыг агуулсан уг багц нь таныг бизнесээ бүрэн удирдахад туслана.{' '}
            </p>
            <div className="space-y-3 mb-6 flex-grow">
              {currentPricing.standard.features.map((feature, index) => (
                <div key={index} className="flex items-center">
                  <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center mr-2">
                    <Check className="w-4 h-4 text-green-600" />
                  </div>
                  <span className="text-sm">{feature}</span>
                </div>
              ))}
            </div>
            <div className="mt-auto w-fit mx-auto space-y-3">
              <a
                className="w-full py-2 px-4 border border-black rounded-full text-sm hover:bg-gray-800 hover:text-white transition-colors mx-auto"
                href="tel:77772040"
              >
                Туршиж үзэх
              </a>
            </div>
          </div>

          <div className="border rounded-3xl p-6 flex flex-col">
            <div className="bg-black text-center py-3 rounded-full mb-6">
              <h3 className="font-bold text-white">PLUS БАГЦ</h3>
            </div>
            <h2 className="text-3xl font-bold text-center mb-2">
              {currentPricing.plus.price} <span className="text-sm">төг</span>
            </h2>
            <p className="text-sm text-gray-600 mb-6">
              Олон салбартай, орлого зарлагаа хянаж, үйл ажиллагаагаа бүрэн цахимжуулах хүсэлтэй бол
              PLUS багцыг сонгоорой
            </p>
            <div className="space-y-3 mb-6 flex-grow">
              {currentPricing.plus.features.map((feature, index) => (
                <div key={index} className="flex items-center">
                  <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center mr-2">
                    <Check className="w-4 h-4 text-green-600" />
                  </div>
                  <span className="text-sm">{feature}</span>
                </div>
              ))}
            </div>
            <div className="mt-auto w-fit mx-auto space-y-3">
              <a
                className="w-full py-2 px-4 border border-black rounded-full text-sm hover:bg-gray-800 hover:text-white transition-colors mx-auto"
                href="tel:77772040"
              >
                Туршиж үзэх
              </a>
            </div>
          </div>
        </div>

        <div className="border rounded-3xl p-6">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-3">
              <button className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center">
                <Plus className="w-4 h-4" />
              </button>
              <span className="font-medium">Нэмэлт модуль</span>
            </div>
            <div className="flex gap-3">
              <button
                className={cn(
                  'px-6 py-2 rounded-full text-sm font-medium',
                  activeAddOnTab === 'сар' ? 'bg-black text-white' : 'bg-gray-100',
                )}
                onClick={() => setActiveAddOnTab('сар')}
              >
                Сараар
              </button>
              <button
                className={cn(
                  'px-6 py-2 rounded-full text-sm font-medium',
                  activeAddOnTab === 'жил' ? 'bg-black text-white' : 'bg-gray-100',
                )}
                onClick={() => setActiveAddOnTab('жил')}
              >
                Жилээр
              </button>
            </div>
          </div>

          <div className="space-y-4">
            {addonModules.map((addon, index) => (
              <div key={index} className="flex justify-between items-center py-2">
                <span className="font-medium">{addon.name}</span>
                <span className="font-medium">{addon.price} төг</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

import banner from "@/assets/images/card/voucherBanner.svg";
import dashed from "@/assets/images/card/voucherDashed.svg";
import Image from "next/image";
type Props = {
  loading: boolean;
  customerProduct;
  isBasket: boolean;
  onChangeState: (voucher, state) => void;
  selectedId?: string;
};

export const getButton = (state: string) => {
  let name = "";
  switch (state) {
    case "ACTIVE":
      name = "Ашиглах";
      break;
    case "READY":
      name = "Буцаах";
      break;

    default:
      break;
  }

  return name;
};

export const VoucherCard = ({
  loading,
  customerProduct,
  isBasket,
  onChangeState,
}: Props) => {
  const product = customerProduct?.product;

  return (
    <>
      <div className="w-[342px] h-[104px] relative transform transition duration-100 hover:scale-[1.01] cursor-pointer ">
        <Image
          width={100}
          height={100}
          className="w-[342px] h-[104px] left-0 top-[0.42px] absolute "
          alt="banner"
          src={banner}
        />
        <div className=" left-[50px] top-[31.97px] absolute">
          <div className="w-[39.81px] h-[39.88px] left-[-0px] top-[-0px] absolute">
            <Image
              width={100}
              height={100}
              className=" w-auto h-auto absolute left-[71px] top-[-24px] "
              alt="dash"
              src={dashed}
            />
          </div>
        </div>
        <div className="w-[160px] h-[3.75rem] left-[140px] top-[16.97px] flex flex-row justify-between align-center absolute">
          <div className="text-primary text-base font-medium leading-snug flex flex-col justify-center align-center">
            <div>{product?.name}</div>
          </div>
          {!isBasket && (
            <div className=" flex  flex-row justify-center align-center ">
              <button
                type="button"
                disabled={loading}
                onClick={() => {
                  onChangeState(customerProduct, customerProduct?.state);
                }}
                className={`w-16 h-8 p-2 text-xs flex justify-center place-self-center ${
                  customerProduct?.state === "ACTIVE"
                    ? "bg-green-500 "
                    : "bg-primary"
                } p-2 rounded-lg cursor-pointer`}
              >
                {getButton(customerProduct?.state)}
              </button>
            </div>
          )}
        </div>
        <Image
          width={100}
          height={100}
          className="w-[87.27px] h-[74.67px] left-[29px] top-[12.42px] absolute rounded-md"
          alt="product"
          src={product?.image}
        />
      </div>
    </>
  );
};

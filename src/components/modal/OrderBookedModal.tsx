import { Order } from "@/lib/types";
import { Modal } from "../ui/modal";
import { Button } from "../ui/button";
import { PAGE_ORDERS } from "@/lib/config/page";

type Props = {
  order?: Order;
  visible: boolean;
  onClose: () => void;
};

const OrderBookedModal = ({ visible, onClose, order }: Props) => {
  return (
    <Modal open={visible} onClose={onClose} className="w-[calc(100%_-_30px)]">
      <Modal.Header className="flex justify-center items-center">
        <div className="h-24 w-24">
          <svg
            stroke="#84cc16"
            fill="#84cc16"
            strokeWidth="0"
            viewBox="0 0 1024 1024"
            className="text-white text-2xl h-full w-full "
            height="1em"
            width="1em"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm193.5 301.7l-210.6 292a31.8 31.8 0 0 1-51.7 0L318.5 484.9c-3.8-5.3 0-12.7 6.5-12.7h46.9c10.2 0 19.9 4.9 25.9 13.3l71.2 98.8 157.2-218c6-8.3 15.6-13.3 25.9-13.3H699c6.5 0 10.3 7.4 6.5 12.7z"></path>
          </svg>
        </div>
      </Modal.Header>
      <Modal.Content className="flex justify-center items-center">
        <div className="text-lg text-center font-medium">
          Таны ширээ захиалга баталгаажлаа
        </div>
        {order?.number && (
          <div className="flex gap-2">
            <div className="opacity-80">Захиалгын дугаар: </div>
            <div className="text-current-2">{order?.number}</div>
          </div>
        )}
        {order?.tables && order.tables.length > 0 && (
          <div className="flex gap-2 -mt-4">
            <div className="opacity-80">Ширээний дугаар: </div>
            <div className="flex items-center justify-center">
              {order.tables.map((e, index) => (
                <>
                  <div key={index} className="text-current-2">
                    {e.name}
                  </div>
                  {index !== order.tables!.length - 1 && (
                    <div className="mr-2 ml-1">,</div>
                  )}
                </>
              ))}
            </div>
          </div>
        )}
      </Modal.Content>
      <div className="w-full flex items-center justify-center p-4">
        <Button
          variant="outline"
          className="w-full max-w-80"
          onClick={() => {
            onClose();
            window.location.href = PAGE_ORDERS;
          }}
        >
          Захиалга
        </Button>
      </div>
    </Modal>
  );
};

export default OrderBookedModal;

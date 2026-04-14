/**
 * Payment status badge.
 * Props:
 *  - status {string} "Paid" | anything else → shows "PENDING"
 */
const PaymentBadge = ({ status }) => {
  if (status === "Paid") {
    return (
      <span className="px-2 py-1 rounded-lg text-[10px] font-extrabold uppercase bg-green-100 text-green-700 border border-green-200">
        PAID
      </span>
    );
  }
  return (
    <span className="px-2 py-1 rounded-lg text-[10px] font-extrabold uppercase bg-yellow-100 text-yellow-700 border border-yellow-200">
      PENDING
    </span>
  );
};

export default PaymentBadge;

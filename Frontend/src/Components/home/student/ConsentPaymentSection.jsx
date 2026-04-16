import { useState } from "react";
import SectionCard from "../register/SectionCard";
import FileUpload from "../register/Fileupload";
import { FaCreditCard, FaCheckCircle, FaSpinner, FaLock, FaVial } from "react-icons/fa";

const ConsentPaymentSection = ({ formData, errors, handleChange, onPaymentSuccess }) => {
  const [loading, setLoading] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState("pending"); // pending, verified

  const handlePayNow = async () => {
    setLoading(true);
    try {
      // 1. Create order
      const res = await fetch("/api/auth/payment/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: 9500 })
      });
      const order = await res.json();
      if (!order.success) throw new Error(order.error);

      // 2. Razorpay Checkout
      const options = {
        key: order.key_id,
        amount: order.amount,
        currency: "INR",
        name: "RKU Training & Placement",
        description: "Placement Registration Fee",
        order_id: order.order_id,
        handler: function (response) {
          setPaymentStatus("verified");
          onPaymentSuccess({
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature
          });
        },
        prefill: {
          name: formData.name || "",
          email: formData.universityEmail || "",
          contact: formData.mobile || ""
        },
        theme: { color: "#2563eb" }
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      alert("Payment failed: " + err.message);
    } finally {
      setLoading(false);
    }
  };



  const handleTestBypass = () => {
    if (window.confirm("Testing Mode: Proceed with ₹0 registration for demo purposes?")) {
      setPaymentStatus("verified");
      onPaymentSuccess({ is_demo_bypass: true });
    }
  };

  return (
    <div className="space-y-6">
      <SectionCard number="5" title="Online Payment" contentClassName="p-6 md:p-8">
        <div className="bg-gray-50 border border-gray-100 rounded-xl p-6 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden group">
          
          {/* Perfected Test Mode Ribbon */}
          <div className="absolute top-0 right-0 pointer-events-none z-10 w-24 h-24 overflow-hidden">
            <div className="bg-red-600 text-white text-[11px] font-bold uppercase py-1.5 w-[150%] text-center absolute top-4 -right-8 rotate-45 shadow-lg flex items-center justify-center gap-1 border-y border-red-500/30">
              <FaVial className="text-[10px]" /> Test Mode
            </div>
          </div>

          {/* Clickable Bypass Area (Upper Right Corner) */}
          <button 
            type="button"
            onClick={handleTestBypass}
            title="Click to Bypass for Testing"
            className="absolute top-0 right-0 w-12 h-12 cursor-pointer z-20 opacity-0 hover:opacity-10 bg-red-600/10 transition-opacity rounded-bl-full"
          />
          <div className="flex items-center gap-4">
            <div className={`w-12 h-12 rounded-full flex items-center justify-center text-xl ${paymentStatus === 'verified' ? 'bg-green-100 text-green-600' : 'bg-blue-100 text-blue-600'}`}>
              {paymentStatus === 'verified' ? <FaCheckCircle /> : <FaCreditCard />}
            </div>
            <div>
              <h3 className="font-bold text-gray-800">Secure Online Payment</h3>
              <p className="text-gray-500 text-xs">Complete your placement registration fee securely via Razorpay to finalize your application.</p>
            </div>
          </div>

          <button
            type="button"
            disabled={loading || paymentStatus === 'verified'}
            onClick={handlePayNow}
            className={`flex items-center gap-2 px-8 py-3 rounded-lg font-bold text-sm transition-all ${
              paymentStatus === 'verified' 
              ? 'bg-green-600 text-white cursor-default' 
              : 'bg-blue-600 text-white hover:bg-black active:scale-95 shadow-md shadow-blue-100'
            }`}
          >
            {loading ? <FaSpinner className="animate-spin" /> : paymentStatus === 'verified' ? <FaCheckCircle /> : <><FaLock className="text-xs" /> Pay Now</>}
            {paymentStatus === 'verified' ? " Paid Successfully" : ""}
          </button>
        </div>
      </SectionCard>

      <SectionCard number="6" title="Document Upload" contentClassName="p-6 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        <FileUpload
          name="consentForm"
          accept=".pdf"
          label={<>Consent Form (PDF) <span className="text-red-500">*</span></>}
          selectedFile={formData.consentForm}
          onChange={handleChange}
          error={errors.consentForm}
        />

        <FileUpload
          name="paymentProof"
          accept="image/*"
          label={<>Payment Proof (Image) <span className="text-red-500">*</span></>}
          selectedFile={formData.paymentProof}
          onChange={handleChange}
          error={errors.paymentProof}
        />
      </SectionCard>
    </div>
  );
};

export default ConsentPaymentSection;
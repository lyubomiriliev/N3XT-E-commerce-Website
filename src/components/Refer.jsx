import { Gift } from "lucide-react";
import React, { useRef } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const Refer = () => {
  const userInfo = useSelector((state) => state.next.userInfo);
  const inputRef = useRef();
  const referralLink = `https://nxt.shop.app/${userInfo.uid}`;

  const handleCopy = () => {
    // Try navigator.clipboard.writeText first
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard
        .writeText(referralLink)
        .then(() => {
          toast("Referral link copied to clipboard!");
        })
        .catch(() => {
          fallbackCopy();
        });
    } else {
      fallbackCopy();
    }
  };

  const fallbackCopy = () => {
    // Fallback method using input selection
    if (inputRef.current) {
      inputRef.current.select();
      inputRef.current.setSelectionRange(0, 99999);
      try {
        document.execCommand("copy");
        toast.success("Referral link copied to clipboard!");
      } catch (err) {
        toast.error("Failed to copy the referral link.");
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg p-6 text-white">
        <div className="flex items-center space-x-4">
          <Gift className="w-12 h-12" />
          <div>
            <h3 className="text-xl font-semibold">
              Invite Friends & Earn Rewards
            </h3>
            <p className="text-indigo-100">
              Get $20 for every friend who makes their first purchase
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h4 className="font-medium mb-4">Share your referral link</h4>
        <div className="flex space-x-2">
          <input
            type="text"
            value={referralLink}
            readOnly
            ref={inputRef}
            className="flex-1 px-4 py-2 border rounded-lg bg-gray-50"
          />
          <button
            onClick={handleCopy}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Copy
          </button>
        </div>

        <div className="mt-6">
          <h4 className="font-medium mb-2">Your Referral Stats</h4>
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <p className="text-2xl font-semibold text-indigo-600">5</p>
              <p className="text-sm text-gray-600">Friends Invited</p>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <p className="text-2xl font-semibold text-indigo-600">3</p>
              <p className="text-sm text-gray-600">Successful Referrals</p>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <p className="text-2xl font-semibold text-indigo-600">$60</p>
              <p className="text-sm text-gray-600">Total Earned</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Refer;

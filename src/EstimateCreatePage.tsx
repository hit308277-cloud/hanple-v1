// src/pages/EstimateCreatePage.tsx

import React, { useState } from "react";

interface EstimateItem {
  id: number;
  name: string;
  quantity: number;
  unitPrice: number;
}

const EstimateCreatePage: React.FC = () => {
  const [customerName, setCustomerName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [memo, setMemo] = useState("");

  const [items, setItems] = useState<EstimateItem[]>([
    { id: 1, name: "", quantity: 1, unitPrice: 0 },
  ]);

  const handleChangeItem = (id: number, field: keyof EstimateItem, value: string) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              [field]:
                field === "quantity" || field === "unitPrice"
                  ? Number(value) || 0
                  : value,
            }
          : item
      )
    );
  };

  const handleAddItem = () => {
    setItems((prev) => [
      ...prev,
      { id: Date.now(), name: "", quantity: 1, unitPrice: 0 },
    ]);
  };

  const subtotal = items.reduce(
    (sum, item) => sum + item.quantity * item.unitPrice,
    0
  );
  const vat = Math.round(subtotal * 0.1);
  const total = subtotal + vat;

  const handleSave = () => {
    const payload = {
      customerName,
      phone,
      address,
      memo,
      items,
      subtotal,
      vat,
      total,
    };

    // TODO: 나중에 실제 API 연동
    console.log("임시 견적 데이터:", payload);
    alert("테스트용: 콘솔에 견적 데이터가 출력되었습니다.");
  };

  return (
    <div style={{ padding: "24px", maxWidth: 960, margin: "0 auto" }}>
      <h1 style={{ fontSize: 20, fontWeight: 700, marginBottom: 16 }}>
        견적서 작성
      </h1>

      {/* 고객 정보 */}
      <section
        style={{
          display: "grid",
          gridTemplateColumns: "120px 1fr",
          gap: "8px 12px",
          marginBottom: 24,
        }}
      >
        <label>고객명</label>
        <input value={customerName} onChange={(e) => setCustomerName(e.target.value)} />

        <label>연락처</label>
        <input value={phone} onChange={(e) => setPhone(e.target.value)} />

        <label>주소</label>
        <input value={address} onChange={(e) => setAddress(e.target.value)} />

        <label>메모</label>
        <textarea
          value={memo}
          onChange={(e) => setMemo(e.target.value)}
          rows={3}
        />
      </section>

      {/* 품목 리스트 */}
      <h2 style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>품목</h2>
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          marginBottom: 12,
        }}
      >
        <thead>
          <tr>
            <th style={{ borderBottom: "1px solid #ddd", padding: 8 }}>품목명</th>
            <th style={{ borderBottom: "1px solid #ddd", padding: 8 }}>수량</th>
            <th style={{ borderBottom: "1px solid #ddd", padding: 8 }}>단가</th>
            <th style={{ borderBottom: "1px solid #ddd", padding: 8 }}>금액</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => {
            const amount = item.quantity * item.unitPrice;
            return (
              <tr key={item.id}>
                <td style={{ borderBottom: "1px solid #eee", padding: 4 }}>
                  <input
                    style={{ width: "100%" }}
                    value={item.name}
                    onChange={(e) =>
                      handleChangeItem(item.id, "name", e.target.value)
                    }
                  />
                </td>
                <td style={{ borderBottom: "1px solid #eee", padding: 4 }}>
                  <input
                    type="number"
                    style={{ width: "100%" }}
                    value={item.quantity}
                    onChange={(e) =>
                      handleChangeItem(item.id, "quantity", e.target.value)
                    }
                  />
                </td>
                <td style={{ borderBottom: "1px solid #eee", padding: 4 }}>
                  <input
                    type="number"
                    style={{ width: "100%" }}
                    value={item.unitPrice}
                    onChange={(e) =>
                      handleChangeItem(item.id, "unitPrice", e.target.value)
                    }
                  />
                </td>
                <td
                  style={{
                    borderBottom: "1px solid #eee",
                    padding: 4,
                    textAlign: "right",
                  }}
                >
                  {amount.toLocaleString()} 원
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <button type="button" onClick={handleAddItem} style={{ marginBottom: 24 }}>
        + 품목 추가
      </button>

      {/* 합계 */}
      <div
        style={{
          maxWidth: 260,
          marginLeft: "auto",
          textAlign: "right",
          marginBottom: 24,
        }}
      >
        <div>공급가액: {subtotal.toLocaleString()} 원</div>
        <div>부가세(10%): {vat.toLocaleString()} 원</div>
        <div style={{ fontWeight: 700, marginTop: 4 }}>
          합계: {total.toLocaleString()} 원
        </div>
      </div>

      <button
        type="button"
        onClick={handleSave}
        style={{ padding: "8px 16px", fontWeight: 600 }}
      >
        임시 저장 (테스트용)
      </button>
    </div>
  );
};

export default EstimateCreatePage;

// data/events.ts
export interface Event {
  id: string;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
}

export const events: Event[] = [
  {
    id: "1",
    title: "Ngày hội xanh Hà Nội",
    description: "Làm sạch công viên và trồng cây tại khu vực Hồ Gươm.",
    startDate: "2025-12-10T08:00:00+07:00",
    endDate: "2025-12-11T17:00:00+07:00",
  },
  {
    id: "2",
    title: "Trồng cây tại TP. HCM",
    description: "Cùng nhau trồng cây xanh tại công viên Lê Văn Tám.",
    startDate: "2025-12-15T08:00:00+07:00",
    endDate: "2025-12-15T12:00:00+07:00",
  },
  {
    id: "3",
    title: "Hội thảo môi trường trực tuyến",
    description: "Chia sẻ kiến thức về bảo vệ môi trường và tái chế rác thải.",
    startDate: "2025-12-01T10:00:00+07:00",
    endDate: "2025-12-02T12:00:00+07:00",
  },
];

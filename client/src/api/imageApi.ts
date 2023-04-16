import { $host } from "./index";
import { toast } from "react-hot-toast";

export const getImage = async (sessionId: string): Promise<string> => {
  try {
    const { data } = await $host.get<string>(`/image?id=${sessionId}`);
    return data;
  } catch (e) {
    toast.error("网络链接错误");
    return "";
  }
};

export const updateImage = async (
  sessionId: string,
  img: string
): Promise<void> => {
  try {
    await $host.post(`/image?id=${sessionId}`, { img });
  } catch (e) {
    toast.error("网络链接错误");
  }
};

import { Type } from '@common/enums/base';

export const type = <T>(obj: T) => {
  const type = Object.prototype.toString.call(obj);
  return type.substring(8, type.length - 1);
};

export const isEmpty = <T>(obj: T) => {
  if (type(obj) === Type.Array) {
    return (obj as any).length === 0;
  }
  if (type(obj) === Type.Object) {
    return Object.keys(obj).length === 0;
  }
  return !obj;
};

export const getCanvasBase64 = (img: string) => {
  const image = new Image();
  image.crossOrigin = '';
  image.src = img;

  if (img) {
    return new Promise((resolve, reject) => {
      image.onload = () => {
        resolve(getBase64Image(image));
      };
    });
  }
};

export const getBase64Image = (img: any, width?: string, height?: string) => {
  const canvas = document.createElement("canvas");
  canvas.width = width ? width : img.width;
  canvas.height = height ? height : img.height;

  const ctx = canvas.getContext("2d");
  ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
  const dataURL = canvas.toDataURL();
  return dataURL;
};

export const getImgFromUrl = (url: string): Promise<HTMLImageElement> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = url;
    img.onload = function () {
      resolve(img);
    };
  });
};
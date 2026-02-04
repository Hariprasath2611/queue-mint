import { forwardRef, type ImgHTMLAttributes, useEffect, useState } from 'react'
import './image.css'
import { cn } from '@/lib/utils';

const FALLBACK_IMAGE_URL = "https://static.wixstatic.com/media/12d367_4f26ccd17f8f4e3a8958306ea08c2332~mv2.png";

type WixImageDataProps = {
  fittingType?: 'fill' | 'fit';
  originWidth?: number;
  originHeight?: number;
  focalPointX?: number;
  focalPointY?: number;
};

export type ImageProps = ImgHTMLAttributes<HTMLImageElement> & WixImageDataProps

/**
 * A simplified Image component that handles Wix media URLs as standard image sources.
 * Removed @wix/image-kit dependency to resolve compilation errors.
 */
export const Image = forwardRef<HTMLImageElement, ImageProps>(
  ({ src, fittingType, originWidth, originHeight, focalPointX, focalPointY, className, ...props }, ref) => {
    const [imgSrc, setImgSrc] = useState<string | undefined>(src)

    useEffect(() => {
      setImgSrc(src)
    }, [src])

    if (!src) {
      return <div data-empty-image ref={ref as any} {...(props as any)} className={cn("bg-muted", className)} />
    }

    return (
      <img
        ref={ref}
        src={imgSrc}
        className={cn(
          fittingType === 'fit' ? 'object-contain' : 'object-cover',
          className
        )}
        onError={() => setImgSrc(FALLBACK_IMAGE_URL)}
        {...props}
      />
    )
  }
)

Image.displayName = 'Image'

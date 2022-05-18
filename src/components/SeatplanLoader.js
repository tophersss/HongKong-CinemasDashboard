import { useEffect, useRef, useState } from 'react'
import SVG, { Props as SVGProps } from "react-inlinesvg";


function useDynamicSVGImport(houseid, options = {}) {
    const ImportedIconRef = useRef();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState();
  
    const { onCompleted, onError } = options;
    useEffect(() => {
      setLoading(true);
      const importIcon = async () => {
        try {
          const { default: myDefault } = await import(`../assets/seatplans/${houseid}.svg`).default;
          ImportedIconRef.current = (
            await import(`../assets/seatplans/${houseid}.svg`)
          ).default;
          if (onCompleted) {
              console.log(`SeatplanLoader onCompleted...`)
              console.log(ImportedIconRef.current)
            onCompleted(houseid, ImportedIconRef.current);
          }
        } catch (err) {
          if (onError) {
            onError(err);
          }
          setError(err);
        } finally {
          setLoading(false);
        }
      };
      importIcon();
    }, [houseid, onCompleted, onError]);
  
    return { error, loading, SvgIcon: ImportedIconRef.current };
  }


const SeatplanLoader = ({ houseid, onCompleted, onError, ...rest }) => {
    const { error, loading, SvgIcon } = useDynamicSVGImport(houseid, {
        onCompleted,
        onError
      });
      if (error) {
        return error.message;
      }
      if (loading) {
        return "Loading...";
      }
      if (SvgIcon) {
        console.log(`svg is valid, returning...`)
        console.log(SvgIcon)
        return <SvgIcon {...rest} />;
      }
      console.log(`seatplan loader returning null`)
      return null;
}

export default SeatplanLoader
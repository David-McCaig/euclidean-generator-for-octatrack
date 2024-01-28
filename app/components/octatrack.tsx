import React from 'react'
import Image from "next/image";
import octatrackImage from "../../public/elektron_octatrack_mkii-top_e0e0e0 copy 3.webp";

function OctaTrack() {
  return (
    <>
            <Image
          className="rounded-t-md"
          src={octatrackImage}
          alt="Elektron Octatrack"
          width={1200}
          height={1200}
        />
    </>
  )
}

export default OctaTrack
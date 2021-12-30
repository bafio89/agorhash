package com.agorhash.rest

import org.apache.commons.lang3.ArrayUtils

object AlgorandUtils {
    val headers = arrayOf("X-API-Key")
val headerValue = arrayOf("INSERT HERE YOUR PURESTAKE API TOKEN")
    val txHeaders = ArrayUtils.add(headers, "Content-Type")
    val txValues = ArrayUtils.add(headerValue, "application/x-binary")
    const val testNetAddressReserve = "77B45T45DBC7CR4XHWVFD5QO4FNSP2UGIXCF7UVBCX4WO6FDGGNHR3U7NA"
    const val mainNetAddressReserve = "BCRGQU4BFMMMTO4YADFPAO3WKZPE2VZILXFCPYOHFGVZRGWFOMC3BB4UPQ"
    const val testNetAssetIndex = 15372981L
    const val mainNetAssetIndex = 196447496L
}

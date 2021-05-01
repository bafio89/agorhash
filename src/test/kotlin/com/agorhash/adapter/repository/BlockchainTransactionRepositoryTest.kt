package com.agorhash.adapter.repository

import com.agorhash.adapter.TransactionAdapter
import com.agorhash.domain.AlgorandTransactionRetrievingException
import com.algorand.algosdk.v2.client.common.IndexerClient
import org.assertj.core.api.Assertions.assertThat
import org.junit.jupiter.api.Assertions
import org.junit.jupiter.api.Test
import java.math.BigInteger

const val receiverAddressReserve = "Q4LQ3VZT2H5YE6RPGXJVHAY32KXBWT527VVTUF75UVSYLMDARDEUNPIN5Y"

class BlockchainTransactionRepositoryTest {

    private val indexerClient: IndexerClient =
        IndexerClient("https://testnet-algorand.api.purestake.io/idx2", 443, "")
    private val assetId = 15010829L
    private val transactionRepository: TransactionRepository =
        BlockchainTransactionRepository(
            indexerClient,
            TransactionAdapter(),
            assetId,
            receiverAddressReserve
        )

    @Test
    fun `retrieve asset transactions`() {

        val transactions = transactionRepository.retrieve()

        assertThat(transactions).containsExactlyInAnyOrder(
            Transaction(
                id = "SSCPB7BRKRQAIUO237WHKJZRROH4PY6UVIXMOJ25P67CQZNBER7Q",
                sender = "IRMUQTWDKYSZO2SJIYFJRKKNNCEYYFOGACVE64BUDOUDBV3OQPL2LGSCP4",
                message = "test message!",
                confirmedRound = 13154550L,
                amount = BigInteger.ONE
            ),
            Transaction(
                id = "N6ZWQUPKLM7PJL6DFG4OC5727FXTY66JGNKG6KPQOCE3OLTOO3DQ",
                sender = "IRMUQTWDKYSZO2SJIYFJRKKNNCEYYFOGACVE64BUDOUDBV3OQPL2LGSCP4",
                message = "",
                confirmedRound = 13154655L,
                amount = BigInteger.ONE
            )
        )
    }

    @Test
    fun `when there are no results`() {

        val transactionRepository: TransactionRepository =
            BlockchainTransactionRepository(
                indexerClient,
                TransactionAdapter(),
                123,
                receiverAddressReserve
            )

        val actual = transactionRepository.retrieve()

        assertThat(actual).isEmpty()
    }

    @Test
    fun `when there are errors`() {
        val misconfiguredClient =
            IndexerClient("https://testnet-algorand.api.purestake.io/idx23", 443, "")
        val transactionRepository: TransactionRepository =
            BlockchainTransactionRepository(
                misconfiguredClient,
                TransactionAdapter(),
                123,
                receiverAddressReserve
            )

        Assertions.assertThrows(AlgorandTransactionRetrievingException::class.java) { transactionRepository.retrieve() }
    }
}
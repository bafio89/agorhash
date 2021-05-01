package com.agorhash.adapter.repository

import com.agorhash.adapter.TransactionAdapter
import com.agorhash.domain.AlgorandTransactionRetrievingException
import com.agorhash.rest.AlgorandUtils.headerValue
import com.algorand.algosdk.crypto.Address
import com.algorand.algosdk.v2.client.common.IndexerClient
import com.algorand.algosdk.v2.client.model.Enums
import com.agorhash.rest.AlgorandUtils.headers
import com.algorand.algosdk.v2.client.model.Enums.AddressRole
import org.slf4j.Logger
import org.slf4j.LoggerFactory
import java.math.BigInteger
import java.time.LocalDateTime
import java.time.ZoneOffset.UTC


val addressRole = AddressRole.RECEIVER

fun interface TransactionRepository {
    fun retrieve(): List<Transaction>
}

class BlockchainTransactionRepository(
    private val indexerClient: IndexerClient,
    private val transactionAdapter: TransactionAdapter,
    private val assetId: Long,
    private val receiver: String
) : TransactionRepository {

    val logger: Logger = LoggerFactory.getLogger(this.javaClass)

    override fun retrieve(): List<Transaction> {

        val response = indexerClient.lookupAssetTransactions(assetId).txType(Enums.TxType.AXFER)
            .addressRole(addressRole).address(
                Address(receiver)
            ).execute(headers, headerValue)

        if (response.code() == 200) {
            return transactionAdapter.fromResponseToDomain(
                response.body()
            )
        }

        logger.error("An error occours retrieving asset transaction: Error code: ${response.code()} and message: ${response.message()}")
        throw AlgorandTransactionRetrievingException("An error occours retrieving asset transaction: Error code: ${response.code()} and message: ${response.message()}")
    }
}

data class Transaction(
    val id: String,
    val sender: String,
    val message: String,
    val confirmedRound: Long,
    val amount: BigInteger
)



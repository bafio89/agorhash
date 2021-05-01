package com.agorhash.adapter

import com.agorhash.adapter.repository.Transaction
import com.algorand.algosdk.v2.client.model.TransactionsResponse
import java.nio.charset.StandardCharsets

class TransactionAdapter {

    fun fromResponseToDomain(response: TransactionsResponse): List<Transaction> =
        response.transactions.map { transaction ->
            Transaction(
                transaction.id,
                sender = transaction.sender,
                message = if (transaction.note != null) String(
                    transaction.note,
                    StandardCharsets.UTF_8
                ) else "",
                confirmedRound = transaction.confirmedRound,
                amount = transaction.assetTransferTransaction.amount
            )
        }

}

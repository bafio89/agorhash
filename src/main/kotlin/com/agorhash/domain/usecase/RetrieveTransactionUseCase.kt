package com.agorhash.domain.usecase

import com.agorhash.adapter.TransactionWithAnswers
import com.agorhash.adapter.TransactionWithResponseBuilder
import com.agorhash.adapter.repository.TransactionRepository

class RetrieveTransactionUseCase(private val blockchainTransactionRepository: TransactionRepository, private val transactionWithResponseBuilder: TransactionWithResponseBuilder) {

    fun retrieveOrderedTransaction() : List<TransactionWithAnswers> {
        return sort(transactionWithResponseBuilder.buildFrom(blockchainTransactionRepository.retrieve().filter { it.message.isNotBlank() }))
    }

    private fun sort(transactions: List<TransactionWithAnswers>) : List<TransactionWithAnswers> {
        return transactions.sortedWith(
            compareByDescending<TransactionWithAnswers> { it.transaction.amount }.thenByDescending { it.transaction.confirmedRound }
        )
    }

}

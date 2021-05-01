package com.agorhash.adapter

import com.agorhash.adapter.repository.Transaction

class TransactionWithResponseBuilder {
    fun buildFrom(transactions: List<Transaction>): List<TransactionWithAnswers> {

        val answerTransactions =
            retrieveSortedAnswerTransactionFrom(transactions)

        val messageTransactions = transactions.subtract(answerTransactions)

        val mappedTransaction =
            joinMessagesWithAnswers(messageTransactions, answerTransactions)

        return messageTransactions.map { transaction ->
            TransactionWithAnswers(
                transaction,
                mappedTransaction[transaction.id]!!
            )
        }
    }

    private fun retrieveSortedAnswerTransactionFrom(transactions: List<Transaction>): List<Transaction> {
        val regex = Regex("""^\[[a-zA-Z0-9]{52,52}].*""")

        return transactions.filter { transaction -> regex.matches(transaction.message) }.sortedWith(
            compareByDescending<Transaction> { it.amount }.thenByDescending { it.confirmedRound })

    }

    private fun joinMessagesWithAnswers(
        messageTransactions: Set<Transaction>,
        answerTransactions: List<Transaction>
    ): MutableMap<String, List<Transaction>> {
        val mappedTransaction =
            messageTransactions.map { Pair(it.id, emptyList<Transaction>()) }.toMap().toMutableMap()

        answerTransactions.forEach { answer ->
            mappedTransaction[answer.message.substring(1, 53)] =
                mappedTransaction[answer.message.substring(1, 53)]!!.plus(cleanMessageRemovingTransactionId(answer))
        }
        return mappedTransaction
    }

    private fun cleanMessageRemovingTransactionId(answer: Transaction) =
        answer.copy(message = answer.message.replace(answer.message.substring(0, 55), ""))
}

data class TransactionWithAnswers(val transaction: Transaction, val answers: List<Transaction>)

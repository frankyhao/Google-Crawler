if(!require(gridExtra)){install.packages("gridExtra", dependencies=TRUE)}
library(gridExtra)

df = read.csv("actual_csv/Daniel-Accuracy.csv")

# create bar chart
error = 100 * abs(df$Timeline - df$Actual) / pmax(df$Timeline, df$Actual)
png("R_Graphs/user-1/user-1_bar_chart.png")
barplot(error, main="Actual vs Timeline Error", xlab="Dates", ylab="% Error", names.arg=df$Date)
dev.off()

df$Error = error

# create table
png("R_Graphs/user-1/user-1_table.png", height=30 * nrow(df), width=70 * ncol(df))
grid.table(df)
dev.off()

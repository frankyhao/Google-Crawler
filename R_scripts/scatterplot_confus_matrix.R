# R script file to generate scatterplots of percent errors
# between the Google Timline data and
# calculated data vs. the total distance traveled that day.

# Install Packages
if(!require(psych)){install.packages("psych", dependencies = TRUE)}
if(!require(cluster)){install.packages("cluster")}
if(!require(fpc)){install.packages("fpc")}
if(!require(caret)){install.packages("caret", dependencies = TRUE, repos = "http://cran.us.r-project.org/")}
library(caret)
library(psych)
library(fpc)
library(cluster)

df_A = read.csv("Downloads/user-2_timeline.csv")        # Google Timeline Actual Data
df_C = read.csv("Downloads/user-2.csv")                 # Calculated KML Data
# print(df_C)

df_A[is.na(df_A)] = 0  # change NA to 0
# df_C = subset(df_C, as.Date(date) >= as.Date("2019-02-01") & as.Date(date) <= as.Date("2019-05-01"))
# df_C = df_C[1:90,]
df_C[is.na(df_C)] = 0  # change NA to 0
# print(df_C)

df_C$total = df_C$walking + df_C$driving + df_C$bus + df_C$train + df_C$plane + df_C$bike

# --------------------------- Scatterplot ---------------------------------------
# walking
png("R_Graphs/plot_walking_2.png")
walking_error = 100 * abs(df_C$walking - df_A$walking) / df_A$walking
plot(x = df_A$walking, y = walking_error, xlab = "Walking Distance(miles)",
        ylab = "% Error", main = "Walking Error")
dev.off()

# driving
png("R_Graphs/plot_driving_2.png")
driving_error = 100 * abs(df_C$driving - df_A$driving) / df_A$driving
plot(x = df_A$driving, y = driving_error, xlab = "Driving Distance(miles)",
        ylab = "% Error", main = "Driving Error")
dev.off()

# bus
png("R_Graphs/plot_bus_2.png")
bus_error = 100 * abs(df_C$bus - df_A$bus) / df_A$bus
plot(x = df_A$bus, y = bus_error, xlab = "Bus Distance(miles)",
        ylab = "% Error", main = "Bus Error")	
dev.off()

# train
#png("R_Graphs/plot_train_2.png")
#train_error = 100 * abs(df_C$train - df_A$train) / df_A$train
#plot(x = df_A$train, y = train_error, xlab = "Train Distance(miles)",
#       ylab = "% Error", main = "Train Error")
#dev.off()

# plane
#png("R_Graphs/plot_plane.png")
#plane_error = 100 * abs(df_C$plane - df_A$plane) / df_A$plane
#plot(x = df_A$plane, y = plane_error, xlab = "Plane Distance(miles)",
#       ylab = "% Error", main = "Plane Error")
#dev.off()

# bike
png("R_Graphs/plot_bike_2.png")
bike_error = 100 * abs(df_C$bike - df_A$bike) / df_A$bike
plot(x = df_A$bike, y = bike_error, xlab = "Bike Distance(miles)",
        ylab = "% Error", main = "Bike Error")
dev.off()

# total
png("R_Graphs/plot_total_2.png")
total_error = 100 * abs(df_C$total - df_A$total) / df_A$total
plot(x = df_A$total, y = total_error, xlab = "Total Distance(miles)",
        ylab = "% Error", main = "Total Error")
dev.off()

# --------------------------- Confusion Matrix ---------------------------------------
# Categorize data by percentile (using percnetile of Google Timeline data). Equal Depth
print("Categorize data by percentile\n")
# Walking
Percentile_00 = min(df_A$walking)
Percentile_33 = quantile(df_A$walking, 0.33333)
Percentile_67 = quantile(df_A$walking, 0.66667)
Percentile_100 = max(df_A$walking)
print(Percentile_00)
print(Percentile_33)
print(Percentile_67)
print(Percentile_100)

df_A$walking_group[df_A$walking >= Percentile_00 & df_A$walking <  Percentile_33]  = "Lower_third"
df_A$walking_group[df_A$walking >= Percentile_33 & df_A$walking <  Percentile_67]  = "Middle_third"
df_A$walking_group[df_A$walking >= Percentile_67 & df_A$walking <= Percentile_100] = "Upper_third"

df_C$walking_group[df_C$walking <  Percentile_33]  = "Lower_third"
df_C$walking_group[df_C$walking >= Percentile_33 & df_C$walking <  Percentile_67]  = "Middle_third"
df_C$walking_group[df_C$walking >= Percentile_67] = "Upper_third"

df_A$walking_group = factor(df_A$walking_group, levels = c("Lower_third", "Middle_third", "Upper_third"))
df_C$walking_group = factor(df_C$walking_group, levels = c("Lower_third", "Middle_third", "Upper_third"))

x = confusionMatrix(df_C$walking_group, df_A$walking_group)
print(x, mode = x$mode, digits = max(3,
  getOption("digits") - 3), printStats = TRUE)

# Categorize data by range of values (using intervals of Google Timeline data) Equal Range
print("Categorize data by equal intervals\n")
# Walking
bounds = seq(min(df_A$walking), max(df_A$walking), length.out = 4)      # 3 categories
print(bounds)

df_A$walking_group2[df_A$walking >= bounds[1] & df_A$walking < bounds[2]] = as.character(1)
df_C$walking_group2[df_C$walking < bounds[2]] = as.character(1)
df_A$walking_group2[df_A$walking >= bounds[2] & df_A$walking < bounds[3]] = as.character(2)
df_C$walking_group2[df_C$walking >= bounds[2] & df_C$walking < bounds[3]] = as.character(2)
df_A$walking_group2[df_A$walking >= bounds[3] & df_A$walking <= bounds[4]] = as.character(3)
df_C$walking_group2[df_C$walking >= bounds[3]] = as.character(3)

df_A$walking_group2 = factor(df_A$walking_group2, levels = c("1", "2", "3"))
df_C$walking_group2 = factor(df_C$walking_group2, levels = c("1", "2", "3"))

x = confusionMatrix(df_C$walking_group2, df_A$walking_group2)
print(x, mode = x$mode, digits = max(3,
  getOption("digits") - 3), printStats = TRUE)

# Categorize data by clustering. Using all modes of transportation as a single point
print("Categorize data by clustering\n")
Data.num_A = df_A[, c("walking", "driving", "bus", "train", "bike")]
Data.num_C = df_C[, c("walking", "driving", "bus", "train", "bike")]

PAMK_A = pamk(Data.num_A, krange = 3:5, metric = "manhattan")
PAM_A = PAMK_A$pamobject
PAM_C = pam(Data.num_C, k = PAMK_A$nc, metric = "manhattan")
PAMClust_A = rep("NA", length(df_A$walking))
PAMClust_C = rep("NA", length(df_C$walking))

i = 1
while (i <= PAMK_A$nc) {
        PAMClust_A[PAM_A$clustering == i] = paste("Cluster", i)
        PAMClust_C[PAM_C$clustering == i] = paste("Cluster", i)
        i = i + 1
}

df_A$Cluster = PAMClust_A
df_C$Cluster = PAMClust_C

df_A$Cluster = factor(df_A$Cluster, levels = paste("Cluster", c(1:PAMK_A$nc)))
df_C$Cluster = factor(df_C$Cluster, levels = paste("Cluster", c(1:PAMK_A$nc)))

x = confusionMatrix(df_C$Cluster, df_A$Cluster)
print(x, mode = x$mode, digits = max(3,
  getOption("digits") - 3), printStats = TRUE)


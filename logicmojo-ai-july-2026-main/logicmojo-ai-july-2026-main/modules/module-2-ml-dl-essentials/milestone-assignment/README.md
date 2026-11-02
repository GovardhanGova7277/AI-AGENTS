# Module 2 milestone: train a network end to end

## Goal

Put the whole module together in one notebook. Train, validate, and test a small PyTorch neural network on a real tabular dataset, read its learning curves, control overfitting, report an honest test score, and save the weights.

This exercises every Module 2 skill in one flow: the split and honest evaluation (class 2.1, What is machine learning), the loss and gradient loop (class 2.2, How models learn), a network of neurons (class 2.3, Neural networks), PyTorch tensors, autograd, and the five-line loop (class 2.4, PyTorch fundamentals), and the training workflow with batches, curves, and saving (class 2.5, Training in practice).

## What to build

Work in `assignment.ipynb`, top to bottom.

1. **Load and split three ways.** Use `load_wine` from scikit-learn (13 features, 3 classes, no download). Split into train, validation, and test. Scale the features, fitting the scaler on the training rows only (no leakage).
2. **Define and train.** Build a small network (13 inputs, a hidden layer, 3 outputs). Train with the five-line loop and `CrossEntropyLoss`. Add one overfitting control: `weight_decay` on the optimizer, dropout, or early stopping. Record training and validation loss each epoch.
3. **Plot the learning curves.** Show train loss and validation loss against epoch, and mark the epoch where validation loss is lowest.
4. **Report the honest test accuracy.** Score the test set (untouched until now) with `model.eval()` and `torch.no_grad()`. Print train and test accuracy.
5. **Write two or three sentences** on what the model learned and where it starts to overfit, using the gap between the curves and the train-minus-test accuracy.
6. **Save the trained weights** with `torch.save(model.state_dict(), ...)`.

## Deliverable

The working notebook with its learning-curve plot, the printed test accuracy, and your short write-up. A fixed seed keeps your run repeatable.

## How this is checked

A reference solution is released in the `solution/` folder. Compare your workflow and numbers to it.
